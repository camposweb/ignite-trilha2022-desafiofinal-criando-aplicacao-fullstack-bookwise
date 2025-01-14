import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHub,
  ],
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      })

      if (existingUser) {
        // Verifica se a conta já está associada ao usuário
        const existingAccount = await prisma.account.findFirst({
          where: {
            userId: existingUser.id,
            provider: account?.provider,
          },
        })

        if (!existingAccount) {
          // Se não há conta associada, cria uma nova associação
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account?.provider ?? '',
              providerAccountId: account?.providerAccountId ?? '',
              type: account?.type ?? '',
              access_token: account?.access_token,
              refresh_token: account?.refresh_token,
              expires_at: account?.expires_at,
              token_type: account?.token_type,
              scope: account?.scope,
              id_token: account?.id_token,
            },
          })
        }
      } else {
        // Se o usuário não existir, ele será criado automaticamente pelo PrismaAdapter
      }

      return true
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
