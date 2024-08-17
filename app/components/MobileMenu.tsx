import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

function MobileMenu() {
  const navBarLinks = [
    { id: 1, name: '首頁', href: '/' },
    { id: 2, name: '我想認養', href: '/animalHome' },
  ];
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
              className='hover:bg-gray-100 hover:text-primary px-2 py-1 rounded-md'
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
