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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      omit: { updatedAt: true, emailVerified: true },
      where: {
        id: session?.user?.id,
      },
    })

    const ratingUser = await prisma.rating.aggregate({
      _count: { rate: true },
      where: {
        userId: session?.user?.id,
      },
    })

    const totalPagesRead = await prisma.book.aggregate({
      _sum: { total_pages: true },
      where: {
        ratings: {
          some: {
            userId: session?.user?.id,
          },
        },
      },
    })

    const totalAuthorsRead = await prisma.book.findMany({
      where: {
        ratings: { some: { userId: session.user?.id } },
      },
      select: {
        author: true,
      },
      distinct: ['author'],
    })

    const categoriesRead = await prisma.categoriesOnBooks.groupBy({
      by: ['categoryId'],
      _count: {
        categoryId: true,
      },
      where: {
        book: {
          ratings: {
            some: {
              userId: session?.user?.id,
            },
          },
        },
      },
      orderBy: {
        _count: {
          categoryId: 'desc',
        },
      },
      take: 1, // Pegue a categoria mais lida
    })

    const mostReadCategoryId = categoriesRead[0]?.categoryId || null

    const mostReadCategory = mostReadCategoryId
      ? await prisma.category.findUnique({
          where: {
            id: mostReadCategoryId,
          },
          select: {
            name: true,
          },
        })
      : null

    const totalPagesReadUser = totalPagesRead._sum.total_pages ?? 0
    const totalBooksReviews = ratingUser._count.rate ?? 0
    const totalAuthorsReadUser = totalAuthorsRead.length ?? 0
    const mostReadCategoryName = mostReadCategory?.name ?? 'Sem dados'

    // const totalCategoriesReadUser = totalCategoriesRead._count.author

    return NextResponse.json(
      {
        user,
        totalPagesReadUser,
        totalBooksReviews,
        totalAuthorsReadUser,
        mostReadCategoryName,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
