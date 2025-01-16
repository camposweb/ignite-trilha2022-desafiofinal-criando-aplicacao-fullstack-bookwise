import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/* export const revalidate = 60 */

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const session = await auth()

    const searchParams = req.nextUrl.searchParams
    const bookName = searchParams.get('book')

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reviewsProfile = await prisma.rating.findMany({
      where: {
        AND: [
          { userId: session?.user?.id },
          {
            OR: [
              {
                book: {
                  name: { contains: bookName || '', mode: 'insensitive' },
                },
              },
            ],
          },
        ],
      },
      include: { book: true },
      orderBy: { created_at: 'desc' },
    })

    return NextResponse.json({ reviewsProfile }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
