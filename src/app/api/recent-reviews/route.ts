import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const recentsReviews = await prisma.rating.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        book: true,
        user: true,
      },
    })

    return NextResponse.json({ recentsReviews }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
