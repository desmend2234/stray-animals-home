'use client';
import { Input } from '@/components/ui/input';
import { variety } from '../constants/options';
import { useEffect, useRef, useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CategorySection() {
  const listRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'all'
  );
  useEffect(() => {
    setSelectedCategory(params.get('category'));
  }, [params]);

  function handleSearch(formData: FormData) {
    const data = Object.fromEntries(formData);
  }
  function scrollRightHadler() {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
  return (
    <div className='relative mt-9'>
      {/* <form action={handleSearch} className='bg-white w-1/4 grow p-4 border-r'>
        <Input type='text' name='pharse' placeholder='搜尋' />
      </form> */}
      <h2 className='text-xl font-bold text-center lg:mb-4'>浪浪種類</h2>
      <div
        className='lg:flex-col flex mx-4 gap-1 overflow-y-auto lg:overflow-x-hidden xs:scrollbar-hide max-h-screen pr-4'
        ref={listRef}
      >
        {variety.map((item) => {
          return (
            <Link
              href={`?category=${item.breed}`}
              key={item.breed.toString()}
              className={` group hover:border-primary h-full min-w-[10rem]  hover:bg-yellow-200 border rounded-xl mt-3 mb-5 lg:my-1 ${
                selectedCategory === item.breed
                  ? 'border-primary bg-yellow-200'
                  : 'border-gray-300'
              }`}
            >
              <h3 className='p-3 line-clamp-1 text-center  cursor-pointer group-hover:scale-125 transition-all duration-200 flex justify-center items-center truncate'>
                {item.breed}
              </h3>
            </Link>
          );
        })}
      </div>
      <ArrowRightCircle
        className='lg:hidden absolute -right-2 cursor-pointer top-[3rem] bg-yellow-500 rounded-full text-white'
        onClick={() => scrollRightHadler()}
      />
    </div>
  );
}

export default CategorySection;
