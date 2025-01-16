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
    const search = searchParams.get('search')

    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
          {
            author: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        ratings: { include: { user: true }, orderBy: { created_at: 'desc' } },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    const booksWithRatings = books.map((book) => {
      return {
        ...book,
        // ratings: book.ratings.map((rating) => rating.rate),
        averageRating: Math.round(
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
            book.ratings.length,
        ),
      }
    })

    if (!categories) {
      return NextResponse.json({ books: booksWithRatings }, { status: 200 })
    }

    const booksWithFilter = await prisma.book.findMany({
      where: {
        AND: [
          {
            categories: {
              some: {
                category: {
                  name: categories,
                },
              },
            },
          },
          {
            OR: [
              {
                name: {
                  contains: search || '',
                  mode: 'insensitive',
                },
              },
              {
                author: {
                  contains: search || '',
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      },
      include: {
        ratings: {
          include: { user: { include: { ratings: true } } },
          orderBy: { created_at: 'desc' },
        },
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
        averageRating: Math.round(
          book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
            book.ratings.length,
        ),
      }
    })

    return NextResponse.json(
      { books: booksWithFilterAndRatings },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
