'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { WithAlertComponent } from '@/app/utils/components';
import { useMessages, useLocalStorage } from '@/app/utils/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client/trpc-client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

export default function Home() {
  const { messages, setMessages, addQuestion, addAnswer, addExceptionMessage } =
    useMessages();

  const userQuery = trpc.getUser.useQuery();
  const messagesQuery = trpc.getMessages.useQuery();
  const postQuestionMutation = trpc.postQuestion.useMutation({
    onSuccess({ answer }) {
      // addAnswer(answer);
      // console.log(answer);
      messagesQuery.refetch();
    },
  });

  // const [localStorageMessages, setLocalStorageMessages] = useLocalStorage(
  //   'messages',
  //   [messages]
  // );
  // useEffect(() => {
  //   setLocalStorageMessages(messages);
  // }, [messages]);

  // useEffect(() => {
  //   setMessages(localStorageMessages);
  // }, []);

  const [question, setQuestion] = useState<string>('');
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (question.trim() !== '') {
      addQuestion(question);
      setQuestion('');
      postQuestionMutation.mutate({ question });
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-4 gap-2'>
      <div className='flex justify-end'>
        {userQuery?.data ? (
          <div>
            {userQuery.data.name}
            <Button asChild>
              <Link href='/session/signout'>Sign Out</Link>
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href='/session/signin'>Sign In</Link>
          </Button>
        )}
      </div>
      <div className='flex flex-grow flex-col border-zinc border-2 rounded p-10'>
        {messagesQuery.data?.map((message) => (
          // message.kind === 'EXCEPTION' ? (
          //   <WithAlertComponent
          //     message={message.content}
          //     description='How can I help you today'
          //     key={message.id}
          //   />
          // ) : (
          <div
            className={cn('flex rounded p-2', {
              'justify-end border': message.kind === 'ANSWER',
            })}
            key={message.id}
          >
            {message.content}
          </div>
        ))}
        {postQuestionMutation.isLoading && (
          <Skeleton className='h-4 rounded-full' />
        )}
      </div>
      <div className='flex gap-2'>
        <Input
          type='text'
          value={question}
          onChange={onInput}
          onKeyUp={handleKeyUp}
        />
        <Button variant='outline' className='px-8' onClick={onSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
}
