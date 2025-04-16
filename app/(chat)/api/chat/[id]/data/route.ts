import { auth } from '@/app/(auth)/auth';
import { getChatById, getMessagesByChatId, getVotesByChatId } from '@/lib/db/queries';
import type { Attachment, UIMessage } from 'ai';
import type { DBMessage } from '@/lib/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    if (!id) return new Response('Missing chat id', { status: 400 });

  const session = await auth();

  // Check for authenticated user
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Get chat details
    const chat = await getChatById({ id });
    if (!chat) {
      return new NextResponse('Chat not found', { status: 404 });
    }

    // Check permissions: only owner can access private chats
    if (chat.visibility === 'private' && chat.userId !== session.user.id) {
      // 403 Forbidden is more appropriate when authenticated but lacking permissions
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Fetch messages and votes concurrently
    const [messagesFromDb, votes] = await Promise.all([
        getMessagesByChatId({ id }),
        getVotesByChatId({ id })
    ]);

    // Convert DB messages to UI messages
    // Ensure DBMessage structure is compatible with UIMessage expectations
    const messages: Array<UIMessage> = messagesFromDb.map((message: DBMessage) => {
        // Explicitly construct the UIMessage object
        const uiMessage: UIMessage = {
            id: message.id,
            // Cast 'parts'. Add validation if DB type might not match.
            parts: message.parts as UIMessage['parts'],
             // Cast 'role'. Add validation if DB type might not match.
            role: message.role as UIMessage['role'],
            // 'content' might need specific handling based on UIMessage definition.
            // Setting to empty string as per original code.
            content: '',
            createdAt: message.createdAt,
            // Cast 'attachments'. Add validation if DB type might not match.
            // Use nullish coalescing for safety.
            experimental_attachments: (message.attachments as Array<Attachment> | undefined | null) ?? [],
        };
        return uiMessage;
    });

    // Return data using NextResponse
    return NextResponse.json({ messages, votes }); // Status 200 is default

  } catch (error) {
    console.error('Error fetching chat data:', error);
    // Use NextResponse for error response
    return new NextResponse('An error occurred while processing your request', { status: 500 });
  }
}