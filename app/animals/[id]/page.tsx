'use client';
import { DirectionAwareHover } from '@/app/components/direction-aware-hover';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

function AnimalPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);

  async function getData() {
    const response = await fetch(
      'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1'
    );
    const data = await response.json();
    const newData = data?.filter(
      (item: any) => item?.animal_subid === params.id
    );
    setData(newData);
  }
  useEffect(() => {
    getData();
  }, [params]);

  return (
    <section className='max-w-7xl mx-auto lg:flex lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 px-4 lg:px-8 xs:flex-col'>
      <div className='lg:grow '>
        <div className='lg:h-[40rem] relative flex items-center justify-center'>
          <DirectionAwareHover imageUrl={data[0]?.album_file}>
            <p className='font-bold text-xl'>{data[0]?.animal_colour}</p>
            <p className='font-normal text-sm'>{data[0]?.animal_bodytype} </p>
          </DirectionAwareHover>
        </div>
      </div>
      <div className='max-w-3xl lg:mx-auto lg:max-w-none w-full mx-auto  mt-[5rem] lg:w-2/5  lg:p-4'>
        <p className='text-sm text-gray-500'>{`${
          data[0]?.animal_sex === 'M' ? '男生' : '女生'
        }`}</p>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold sm:text-3xl text-gray-900'>
            {data[0]?.animal_Variety}
          </h1>
          <small className='text-gray-500 text-sm'>
            {data[0]?.animal_update}更新
          </small>
        </div>
        <div className='border-b my-10 border-gray-200'></div>
        <ul className='mt-4 space-y-4 '>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p>尋獲地：</p>
            <p> {data[0]?.animal_foundplace}</p>
          </li>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p>年齡：</p>
            <p>{`${data[0]?.animal_age === 'ADULT' ? '成年' : '幼年'}`}</p>
          </li>
          <li className='text-sm text-gray-500'>
            {`${data[0]?.animal_sterilization === 'T' ? '已絕育' : '未絕育'}`}
          </li>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p>開放認養時間：</p>
            <p>{`${
              data[0]?.animal_opendate?.split(' ')[0] === ''
                ? '尚未'
                : data[0]?.animal_opendate?.split(' ')[0]
            }`}</p>
          </li>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p className='basis-16'>附註：</p>
            <p>{`${
              data[0]?.animal_remark === '' ? '無' : data[0]?.animal_remark
            }`}</p>
          </li>{' '}
        </ul>
        <div className='border-b my-10 border-gray-200'></div>
        <ul className='space-y-2'>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p>收容所名稱：</p>
            <p>{data[0]?.shelter_name}</p>
          </li>
          <Link
            href={`http://www.google.com/maps/search/?api=1&query=${data[0]?.shelter_name}`}
            target='_blank'
          >
            <li className='text-sm text-gray-500 flex justify-start '>
              <p>收容所地址：</p>
              <p className='underline cursor-pointer'>
                {data[0]?.shelter_address}(點擊查看地圖)
              </p>
            </li>
          </Link>
          <li className='text-sm text-gray-500 flex justify-start'>
            <p>收容所電話：</p>
            <p>{data[0]?.shelter_tel}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AnimalPage;
