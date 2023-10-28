import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function SignIn() {
  return (
    <div className='flex justify-center pt-8'>
      <div className='flex items-center gap-2'>
        <Button asChild>
          <LoginLink> Sign In </LoginLink>
        </Button>
        <Button asChild>
          <RegisterLink> Sign Up </RegisterLink>
        </Button>
      </div>
    </div>
  );
}
