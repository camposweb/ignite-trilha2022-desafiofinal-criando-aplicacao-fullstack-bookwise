import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/* export const revalidate = 60 */

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const books = await prisma.book.findUnique({
      where: {
        id: params.id,
      },
      include: {
        ratings: { include: { user: true } },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    const booksWithRatings = books && {
      return: {
        ...books,
        // ratings: books.ratings.map((rating) => rating.rate),
        averageRating: Math.floor(
          books.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
            books.ratings.length,
        ),
      },
    }
    // const params = req.nextUrl.searchParams
    // const id = params.get('id')

    // const categories = params.

    /* const books = await prisma.book.findUnique({
      where: {
        id: params.valueOf(),
      },
      include: {
        ratings: { include: { user: true } },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
 */
    /* const booksWithRatings = books.map((book) => {
      return {
        ...book,
        // ratings: book.ratings.map((rating) => rating.rate),
        averageRating:
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
          book.ratings.length,
      }
    }) */

    /* if (!categories) {
      return NextResponse.json({ books: booksWithRatings }, { status: 200 })
    }

    const booksWithFilter = await prisma.book.findMany({
      where: {
        categories: {
          some: {
            category: {
              name: categories,
            },
          },
        },
      },
      include: {
        ratings: { include: { user: { include: { ratings: true } } } },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    const booksWithFilterAndRatings = booksWithFilter.map((book) => {
      return {
        ...book,
        // ratings: book.ratings.map((rating) => rating.rate),
        averageRating:
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
          book.ratings.length,
      }
    }) */

    return NextResponse.json({ books: booksWithRatings }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
