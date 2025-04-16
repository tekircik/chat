import { auth } from '@/app/(auth)/auth';
import { getChatById, getMessagesByChatId, getVotesByChatId } from '@/lib/db/queries';
import type { Attachment, UIMessage } from 'ai';
import type { DBMessage } from '@/lib/db/schema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return new Response('Missing chat id', { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Get chat details
    const chat = await getChatById({ id });

    if (!chat) {
      return new Response('Chat not found', { status: 404 });
    }

    // Check permissions
    if (chat.visibility === 'private' && chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get messages and votes
    const messagesFromDb = await getMessagesByChatId({ id });
    const votes = await getVotesByChatId({ id });

    // Convert DB messages to UI messages
    const messages: Array<UIMessage> = messagesFromDb.map((message: DBMessage) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      content: '',
      createdAt: message.createdAt,
      experimental_attachments: (message.attachments as Array<Attachment>) ?? [],
    }));

    return Response.json({ 
      messages,
      votes
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching chat data:', error);
    return new Response('An error occurred while processing your request', { status: 500 });
  }
}