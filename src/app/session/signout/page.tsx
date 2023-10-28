import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function SignIn() {
  return (
    <div className='flex justify-center pt-8'>
      <div className='flex items-center gap-2'>
        <Button asChild>
          <LogoutLink> Logout </LogoutLink>
        </Button>
      </div>
    </div>
  );
}
