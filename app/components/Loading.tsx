import { Skeleton } from '@/components/ui/skeleton';

export function LoadingAnimalCarousel() {
  return (
    <>
      <div className='hidden lg:flex gap-6 flex-wrap justify-center'>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </div>
      {/* <div className='flex lg:hidden gap-6 flex-wrap justify-center'>
        <Loading />
        <Loading />
      </div> */}
    </>
  );
}

function Loading() {
  return (
    <div className='w-1/3 sm:w-2/5 lg:w-1/5'>
      <Skeleton className='w-full h-[230px]' />
      <div className='flex flex-col mt-2 gap-y-2'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-6' />
      </div>
      <Skeleton className='w-full h-8 mt-5' />
    </div>
  );
}

export default Loading;
