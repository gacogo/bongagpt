import { FormEvent, useState } from 'react';
import { trpc } from '@/trpc/client/trpc-client';
import { useRouter } from 'next/navigation';

export function StripeNewUserForm() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const userQuery = trpc.getUser.useQuery();

  const createStripeCustomerMutation = trpc.createStripeCustomer.useMutation({
    onSuccess({ kindeUserId }) {
      console.log(`user id found`, kindeUserId);
    },
  });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      userQuery.data?.kindeUserId;
    } catch (error) {
      router.push('/session/signin');
    }
    await createStripeCustomerMutation.mutateAsync({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
}
