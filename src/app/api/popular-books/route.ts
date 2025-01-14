import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const popularBooksWithRatings = await prisma.book.findMany({
      orderBy: { ratings: { _count: 'desc' } },
      take: 4,
      include: {
        ratings: { include: { user: true }, orderBy: { created_at: 'desc' } },
        categories: { include: { category: true } },
      },
    })

    const popularBooks = popularBooksWithRatings.map((book) => {
      return {
        ...book,
        // ratings: book.ratings.map((rating) => rating.rate),
        averageRating: Math.round(
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
            book.ratings.length,
        ),
      }
    })

    return NextResponse.json({ popularBooks }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
