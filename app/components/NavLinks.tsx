'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const navBarLinks = [
  { id: 1, name: '首頁', href: '/' },
  { id: 2, name: '我想認養', href: '/animalHome' },
  { id: 3, name: 'Contact', href: '/contact' },
];
function NavLinks() {
  const location = usePathname();

  return (
    <div className='hidden md:flex justify-center items-center col-span-6 gap-x-2 '>
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
  );
}

export default NavLinks;
