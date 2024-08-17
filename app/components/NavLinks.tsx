import Link from 'next/link';

export const navBarLinks = [
  { id: 1, name: '首頁', href: '/' },
  { id: 2, name: '我想認養', href: '/animalHome' },
];
function NavLinks() {
  return (
    <div className='hidden md:flex justify-center items-center col-span-6 gap-x-2 '>
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
  );
}

export default NavLinks;
