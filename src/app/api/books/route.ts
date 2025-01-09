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

    const books = await prisma.book.findMany()

    if (!categories) {
      return NextResponse.json({ books }, { status: 200 })
    }

    // const Category = 'Programação'

    const searchBooksWithQuery = await prisma.categoriesOnBooks.findMany({
      where: {
        Category: {
          name: categories,
        },
      },
    })

    const getBooksId = searchBooksWithQuery.map((book) => book.bookId)

    const booksWithFilter = await prisma.book.findMany({
      where: {
        id: {
          in: getBooksId,
        },
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
