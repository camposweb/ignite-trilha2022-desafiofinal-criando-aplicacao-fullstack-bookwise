'use client'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { Binoculars } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'

interface BooksProps {
  id: string
  name: string
  author: string
  sinopse: string
  cover_url: string
  total_pages: number
}

export function Explorar() {
  const { data: books } = useQuery<BooksProps[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const { data } = await api.get(`${env.NEXT_PUBLIC_BASE_URL}/api/books`)
      return data
    },
  })
  return (
    <div className="flex w-full flex-col">
      <div className="mt-[72px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-100" />
          <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
            Explorar
          </h1>
        </div>
      </div>
    </div>
  )
}
