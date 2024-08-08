import { Card } from '@/components/ui/card';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import prisma from '../lib/db';
import SettingForm from '../components/SettingForm';

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  return data;
}

async function SettingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }
  const data = await getData(user.id);

  return (
    <section className='max-w-7xl px-4 md:px-8 mx-auto'>
      <Card>
        <SettingForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}

export default SettingPage;
