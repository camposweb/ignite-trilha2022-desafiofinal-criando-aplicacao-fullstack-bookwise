import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  description: z.string().min(1).max(450),
  rate: z.number().min(0).max(5),
})

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const session = await auth()

  if (!session) {
    return NextResponse.json(
      { message: 'precisa estar logado' },
      { status: 401 },
    )
  }

  try {
    const body = await req.json()
    const { userId, bookId, description, rate } = bodySchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: 'Usuário não existe' },
        { status: 400 },
      )
    }

    const existingBook = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    })

    if (!existingBook) {
      return NextResponse.json({ message: 'Livro não existe' }, { status: 400 })
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        bookId,
      },
    })

    if (existingRating) {
      return NextResponse.json(
        { message: 'Você já avaliou esse livro' },
        { status: 400 },
      )
    }

    await prisma.rating.create({
      data: {
        userId,
        bookId,
        description,
        rate,
      },
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
