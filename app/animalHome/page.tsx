import AnimalCard from '../components/AnimalCard';
import CategorySection from '../components/CategorySection';

async function AnimalPage() {
  return (
    <div className='flex mx-auto flex-col lg:flex-row max-w-3xl lg:max-w-7xl sm:pb-6 px-4 md:px-8'>
      <div className='lg:w-1/5 mx-3'>
        <CategorySection />
      </div>
      <div className='bg-yellow-100 lg:w-4/5 grow rounded-lg'>
        <h2 className='font-bold m-4'>浪浪認養</h2>
        <AnimalCard />
      </div>
    </div>
  );
}

export default AnimalPage;
