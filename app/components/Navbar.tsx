import Link from 'next/link';
import React from 'react';
import NavLinks from './NavLinks';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserNav from './UserNav';
async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className='relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center pz-4 md:px-8 mx-auto py-7'>
      <div className='md:col-span-3 mx-auto'>
        <Link href='/'>
          <h1 className='text-2xl font-semibold text-primary'>浪🐶😻</h1>
        </Link>
      </div>
      <NavLinks />
      <div className='flex items-center ms-auto md:grid-cols-3 gap-x-2'>
        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className='flex items-center gap-2'>
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button className='' variant='secondary' asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className='md:hidden'>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
