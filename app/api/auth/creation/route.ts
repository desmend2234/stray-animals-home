import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || user === null || !user.id) throw new Error('Unauthorized');

    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email ?? '',
          firstName: user.given_name ?? '',
          lastName: user.family_name ?? '',
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }
  } catch (error: any) {
    console.error('Error in GET /api/auth/creation:', error.message);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://stray-animals-home.vercel.app/';
  return NextResponse.redirect(redirectUrl);
}
