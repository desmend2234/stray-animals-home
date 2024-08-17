'use client';
import Image from 'next/image';

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
import { LoadingAnimalCarousel } from './AnimalCard';
import { useEffect, useState } from 'react';

const CACHE_DURATION = 600000; // 緩存持續時間，單位為毫秒 (例如 5 分鐘)

export function CatCaousel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const cacheKey = 'catData';
    const cacheTimestampKey = `${cacheKey}_timestamp`;
    const cacheData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheTimestampKey);
    const now = new Date().getTime();

    try {
      if (
        cacheData &&
        cacheTimestamp &&
        now - parseInt(cacheTimestamp) < CACHE_DURATION
      ) {
        const pastData = JSON.parse(cacheData);
        const newData = pastData
          ?.slice(0, 20)
          .filter((animal: any) => animal?.animal_kind === '貓');
        setData(newData);
        setLoading(false);
        return;
      } else {
        const response = await fetch(
          'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1'
        );
        const newData = await response.json();

        const catData = newData
          .filter((animal: any) => animal?.animal_kind === '貓')
          .slice(0, 20);
        localStorage.setItem(cacheKey, JSON.stringify(catData));
        localStorage.setItem(cacheTimestampKey, now.toString());
        setData(catData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='mt-12'>
      {loading ? (
        <LoadingAnimalCarousel />
      ) : data?.length > 0 ? (
        <div className='grid grid-cols-1 gap-10 mt-4'>
          <div>
            <div className='rounded-lg flex'>
              <Carousel className='w-full mx-auto'>
                <CarouselContent>
                  {data?.slice(0, 20)?.map((animal: any) => (
                    <CarouselItem
                      key={animal?.animal_subid}
                      className='basis-1/2 md:basis-1/4'
                    >
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
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        '沒有資料...🥹'
      )}
    </div>
  );
}

// export function AnimalRow({ item }: { item: Animal[] }) {
//   return (
//     <>
//       <Carousel className='w-full mx-auto'>
//         <CarouselContent>
//           {item?.slice(0, 20)?.map((animal, index) => (
//             <CarouselItem key={index} className='basis-1/2 md:basis-1/4'>
//               <Link href={`/animals/${animal?.animal_subid}`}>
//                 <div className='relative h-[230px]'>
//                   <Image
//                     src={animal?.album_file}
//                     alt={animal?.animal_subid}
//                     fill
//                     className='object-cover w-full h-full rounded-lg shadow-md'
//                   />
//                 </div>
//                 <div className=''>
//                   <h1 className='text-xl font-semibold mt-2'>
//                     {animal?.animal_Variety}
//                   </h1>
//                   <div className='flex justify-between items-center'>
//                     <h3 className='items-center inline-flex'>
//                       {animal?.animal_sex == 'M' ? '男生' : '女生'}
//                     </h3>
//                     <h3 className='text-sm bg-yellow-200 rounded-lg px-2'>
//                       {animal?.animal_colour}
//                     </h3>
//                   </div>
//                 </div>
//                 <Button className='w-full mt-3'>瞭解更多</Button>
//               </Link>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className='ml-16' />
//         <CarouselNext className='mr-16' />
//       </Carousel>
//     </>
//   );
// }
