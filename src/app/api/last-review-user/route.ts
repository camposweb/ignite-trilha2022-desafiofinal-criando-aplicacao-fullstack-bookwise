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

    if (!session) {
      return NextResponse.json(
        { message: 'Usuário não está logado' },
        { status: 400 },
      )
    }

    const lastReviewUser = await prisma.rating.findFirst({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: { book: true },
    })

    return NextResponse.json({ lastReviewUser }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
