'use client';

import Image from 'next/image';
import React from 'react';
import { Animal } from '../types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingAnimalCarousel } from './AnimalCard';

const FallbackComponent = () => (
  <div>
    <p>Something went wrong while loading the carousel.</p>
  </div>
);

export async function CatCaousel() {
  async function getData() {
    const response = await fetch(
      'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1'
    );
    const data = await response?.json();
    const newData = data?.slice(0, 50);
    return newData;
  }
  const data = await getData();
  const cats = data?.filter((animal: any) => animal?.animal_kind === '貓');

  return (
    <div className='mt-12'>
      <div className='grid grid-cols-1 gap-10 mt-4'>
        <div>
          <div className='rounded-lg flex'>
            <AnimalRow item={cats} />
          </div>{' '}
        </div>
      </div>
    </div>
  );
}

export function AnimalRow({ item }: { item: Animal[] }) {
  return (
    <>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Carousel className='w-full mx-auto'>
          <CarouselContent>
            {item?.slice(0, 5)?.map((animal, index) => (
              <CarouselItem key={index} className='basis-1/2 md:basis-1/4'>
                <Link href={`/animals/${animal?.animal_subid}`}>
                  <div className='relative h-[230px]'>
                    <Image
                      src={animal?.album_file}
                      alt={animal?.animal_subid}
                      fill
                      className='object-cover w-full h-full rounded-lg shadow-md'
                    />
                  </div>
                  <div className=''>
                    <h1 className='text-xl font-semibold mt-2'>
                      {animal?.animal_Variety}
                    </h1>
                    <div className='flex justify-between items-center'>
                      <h3 className='items-center inline-flex'>
                        {animal?.animal_sex == 'M' ? '男生' : '女生'}
                      </h3>
                      <h3 className='text-sm bg-yellow-200 rounded-lg px-2'>
                        {animal?.animal_colour}
                      </h3>
                    </div>
                  </div>
                  <Button className='w-full mt-3'>瞭解更多</Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='ml-16' />
          <CarouselNext className='mr-16' />
        </Carousel>{' '}
      </ErrorBoundary>
    </>
  );
}

export function LoadingAnimal() {
  return (
    <div className='max-w-7xl mx-auto px-4 md:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-3'>
        <LoadingAnimalCarousel />
        <LoadingAnimalCarousel />
        <LoadingAnimalCarousel />
        <LoadingAnimalCarousel />
      </div>
    </div>
  );
}
