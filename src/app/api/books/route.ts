import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/* export const revalidate = 60 */

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const searchParams = req.nextUrl.searchParams
    const categories = searchParams.get('categories')

    const books = await prisma.book.findMany({
      include: {
        ratings: true,
        categories: {
          include: {
            Category: true,
          },
        },
      },
    })

    const booksWithRatings = books.map((book) => {
      return {
        ...book,
        // ratings: book.ratings.map((rating) => rating.rate),
        averageRating:
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
          book.ratings.length,
      }
    })

    if (!categories) {
      return NextResponse.json({ books: booksWithRatings }, { status: 200 })
    }

    const booksWithFilter = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            Category: {
              name: categories,
            },
          },
        },
      },
      include: {
        ratings: true,
      },
    })

    return NextResponse.json({ books: booksWithFilter }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
