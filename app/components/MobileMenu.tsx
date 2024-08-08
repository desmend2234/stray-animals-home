'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';
import { navBarLinks } from './NavLinks';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

function MobileMenu() {
  const location = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='mx-2'>
          <Menu className='w-4 h-4'></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='flex mt-5 flex-col space-y-1 px-2'>
          {navBarLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                location == link.href
                  ? 'bg-muted'
                  : 'hover:bg-muted hover::bg-opacity-75',
                'group flex items-center px-10 py-2 font-medium'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
