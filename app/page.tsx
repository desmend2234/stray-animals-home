import Image from 'next/image';
import Navbar from './components/Navbar';

import { Suspense } from 'react';

import Link from 'next/link';
import { DogCaousel } from './components/DogCaousel';
import { CatCaousel } from './components/CatCaousel';
import { LoadingAnimalCarousel } from './components/Loading';

export default function Home() {
  return (
    <section className='mx-auto max-w-2xl lg:max-w-7xl sm:pb-6 px-4 md:px-8'>
      <div className='flex flex-wrap justify-between md:mb-16'>
        <div className='mb-8 flex w-full flex-col lg:w-1/3 justify-center lg:pb-24 lg:pt-24 sm:mb-12 lg:mb-0'>
          <h1 className='text-4xl mb-4 md:mb-8 font-bold'>浪浪認養平台</h1>
          <p className='text-pretty max-w-md leading-relaxed xl:text-lg text-gray-500'>
            在這裡，你可以找到全台灣各地的浪浪認養地圖，讓浪浪找到一個溫暖的家。
          </p>
        </div>

        <div className='mb-12 flex w-full lg:w-2/3 md:mb-16'>
          <div className='bg-gray-100 relative left-12 top-12 z-20 -ml-10 overflow-hidden rounded-lg shadow-lg md:left-16 md:top-16 lg:ml-0'>
            <Image
              src='/cat.avif'
              alt='cat picture'
              className='h-full w-full object-cover'
              width={500}
              height={500}
              priority
            />
          </div>
          <div className='overflow-hidden rounded-lg bg-red-100 shadow-lg'>
            <Image
              src='/dog.avif'
              alt='dog picture'
              className='h-full w-full object-cover object-center'
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
      <div className='md:flex md:items-center md:justify-between '>
        <h2 className='text-2xl font-bold mb-2'>最新開放認養狗狗🐶</h2>
        <Link
          className='hover:text-blue-700/50 font-medium mb:block text-blue-700'
          href='/animalHome'
        >
          查看更多 <span className='text-xl'>&rarr;</span>
        </Link>
      </div>
      <Suspense fallback={<LoadingAnimalCarousel />}>
        <DogCaousel />
      </Suspense>
      <div className='md:flex md:items-center md:justify-between my-10'>
        <h2 className='text-2xl font-bold mb-2'>最新開放認養貓咪😻</h2>
        <Link
          className='hover:text-blue-700/50 font-medium mb:block text-blue-700'
          href='/animalHome'
        >
          查看更多 <span className='text-xl'>&rarr;</span>
        </Link>
      </div>
      <Suspense fallback={<LoadingAnimalCarousel />}>
        <CatCaousel />
      </Suspense>
    </section>
  );
}
