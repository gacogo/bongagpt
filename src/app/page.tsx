'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { useMessages, useLocalStorage } from '@/app/utils/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc/client/trpc-client';
import Link from 'next/link';

export default function Home() {
  const { addQuestion, addAnswer, messages } = useMessages();
  const [questionInput, setQuestionInput] = useState<string>('');
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(event.target.value);
  };
  const userQuery = trpc.getUser.useQuery();
  const messagesQuery = trpc.getMessages.useQuery();
  const postQuestionMutation = trpc.postQuestion.useMutation({
    onSuccess({ answer }) {
      console.log(answer.content);
      addAnswer(answer.content, answer.id);
    },
  });

  useEffect(() => {
    if (userQuery?.data) {
      messagesQuery.data?.forEach((message) => {
        addQuestion(message.question, message.id);
        message.answers.forEach((answer) => {
          addAnswer(answer.content, answer.id);
        });
      });
    }
  }, [userQuery?.data]);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit(event as any);
    }
  };

  const onSubmit = (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (questionInput.trim() !== '') {
      console.log(questionInput);
      addQuestion(questionInput);
      setQuestionInput('');
      postQuestionMutation.mutate({ question: questionInput });
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-4 gap-2'>
      <div className='flex justify-end'>
        {userQuery?.data ? (
          <div className='flex p-8 rounded gap-2'>
            <div> Hello {userQuery.data.name} </div>
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
      <div className='flex flex-grow flex-col gap border-zinc border-2 rounded p-10'>
        {messages.map((message) => (
          <div
            className={cn('flex flex-col rounded p-2 gap-4')}
            key={message.id}
          >
            <div className={cn('self-start bg-gray-700 p-2 rounded')}>
              {message.content}
            </div>
            {/*{message.answers.map((answer) => (
              <div
                className={cn(
                  'flex flex-grow bg-gray-700 p-4 justify-end border gap-2'
                )}
                key={answer.id}
              >
                {' '}
                {answer.content}{' '}
              </div>
                ))}*/}
          </div>
        ))}

        {postQuestionMutation.isLoading && (
          <Skeleton className='h-8 rounded-full'>loading...</Skeleton>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className='flex  gap-2'>
          <Input
            type='text'
            value={questionInput}
            onChange={onInput}
            onKeyUp={handleKeyUp}
          />
          <Button variant='outline' className='px-8' type='submit'>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
