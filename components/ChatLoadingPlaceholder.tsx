'use client';

import { motion } from 'framer-motion';
import { SparklesIcon } from './icons';

export function ChatLoadingPlaceholder() {
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background w-full">
      {/* Chat header */}
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
        <div className="size-8 rounded-full bg-muted-foreground/10 animate-pulse"></div>
        <div className="h-5 w-32 bg-muted-foreground/20 rounded-md animate-pulse"></div>
        <div className="ml-auto size-8 rounded-full bg-muted-foreground/10 animate-pulse"></div>
      </header>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* User message 1 */}
          <div className="w-full flex justify-end">
            <motion.div 
              className="bg-primary text-primary-foreground px-3 py-2 rounded-xl max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="h-4 w-56 bg-primary-foreground/20 rounded-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="h-4 w-40 bg-primary-foreground/20 rounded-md mt-2"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
            </motion.div>
          </div>

          {/* Assistant message 1 */}
          <div className="w-full flex gap-4">
            {/* Assistant avatar */}
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
            
            {/* Assistant message content */}
            <div className="flex flex-col gap-3 w-full max-w-2xl">
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-5/6"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
              />
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-full"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
              />
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-4/5"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              />
            </div>
          </div>
          
          {/* User message 2 */}
          <div className="w-full flex justify-end">
            <motion.div 
              className="bg-primary text-primary-foreground px-3 py-2 rounded-xl max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div 
                className="h-4 w-64 bg-primary-foreground/20 rounded-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="h-4 w-48 bg-primary-foreground/20 rounded-md mt-2"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div 
                className="h-4 w-32 bg-primary-foreground/20 rounded-md mt-2"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </motion.div>
          </div>

          {/* Assistant message 2 */}
          <div className="w-full flex gap-4">
            {/* Assistant avatar */}
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
            
            {/* Assistant message content */}
            <div className="flex flex-col gap-3 w-full max-w-2xl">
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-3/4"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
              />
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-full"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.1,
                }}
              />
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-5/6"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
              />
              <motion.div 
                className="h-4 bg-muted-foreground/20 rounded-md w-2/3"
                animate={{
                  background: 'linear-gradient(90deg, #a1a1aa 25%, #f4f4f5 50%, #a1a1aa 75%)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: ['0% 0%', '100% 0%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="mx-auto px-4 bg-background pb-4 md:pb-6 w-full md:max-w-3xl">
        <div className="relative w-full flex flex-row justify-center rounded-xl border shadow-sm bg-background p-2">
          <div className="size-8 rounded-md bg-muted-foreground/10"></div>
          <div className="h-8 flex-1 mx-2 rounded-md bg-muted-foreground/10"></div>
          <div className="size-8 rounded-md bg-muted-foreground/10"></div>
        </div>
      </div>
    </div>
  );
}