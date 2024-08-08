'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Animal } from '../types';
import { useSearchParams } from 'next/navigation';
import Loading from './Loading';
import { LoadingAnimalCard } from '../animalHome/loading';

function AnimalCard() {
  const [data, setData] = useState<Animal[]>([]);
  const [category, setCategory] = useState<string | null>('all');
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  async function getData(category: string | null) {
    setLoading(true);
    const response = await fetch(
      'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1'
    );
    const rawData = await response.json();
    let newData = rawData.slice(0, 40);
    if (category && category !== 'All') {
      newData = newData.filter(
        (item: any) => item.animal_Variety.trim() == category
      );
    }
    setDataLength(newData.length);
    setData(newData);
    setLoading(false);
  }

  const params = useSearchParams();

  useEffect(() => {
    const categoryParam = params.get('category');
    setCategory(categoryParam);
    getData(categoryParam);
  }, [params]);

  return (
    <>
      <div className='text-center mb-4'>
        {!loading ? `總共有 ${dataLength} 筆資料` : '資料讀取中...🥹'}
      </div>
      {loading ? (
        <LoadingAnimalCard />
      ) : dataLength > 0 ? (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-4 mx-auto max-w-2xl lg:max-w-7xl sm:pb-6 px-4 md:px-8 '>
          {data.map((animal) => {
            return (
              <Link
                href={`/animals/${animal.animal_subid}`}
                key={animal.animal_subid}
              >
                <div>
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
                        {animal.animal_sex == 'M' ? '男生' : '女生'}
                      </h3>
                      <h3 className='text-sm bg-yellow-200 rounded-lg px-2'>
                        {animal?.animal_colour}
                      </h3>
                    </div>
                  </div>
                  <Button className='w-full mt-3'>
                    <Link href={`/animals/${animal?.animal_subid}`}>
                      瞭解更多
                    </Link>
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className='text-center text-gray-700 mt-4 text-2xl mb-4'>
          沒有資料
        </div>
      )}
    </>
  );
}

export default AnimalCard;

export function LoadingAnimalCarousel() {
  return (
    <div className='flex gap-6 flex-wrap justify-center'>
      <Loading />
      <Loading />
      <Loading />
    </div>
  );
}
