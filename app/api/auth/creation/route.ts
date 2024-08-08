import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id || user == null) throw new Error('Unauthorized');
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
    return NextResponse.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error in GET /api/auth/creation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
