import React from 'react';

function AnimalList({ data }: { data: any }) {
  return (
    <>
      {data.map((item: any, index: number) => {
        return (
          <div key={index} className='bg-white p-4 shadow-md rounded-lg'>
            <h2 className='text-xl font-semibold'>{item.animal_Variety}</h2>
            <div className='flex justify-between items-center'>
              <h3 className='items-center inline-flex'>{item.animal}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AnimalList;
