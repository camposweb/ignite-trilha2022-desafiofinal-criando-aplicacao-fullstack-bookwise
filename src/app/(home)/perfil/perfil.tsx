'use client'
import { ItemInfoIcon } from '@/components/item-info-icon'
import { ReviewProfile } from '@/components/review-profile'
import { SearchInput } from '@/components/search-input'
import { SideBar } from '@/components/sidebar'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import {
  BookmarkSimple,
  BookOpen,
  Books,
  User,
  UserList,
} from '@phosphor-icons/react/dist/ssr'
import * as Separator from '@radix-ui/react-separator'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import Image from 'next/image'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(relativeTime)

interface ReviewsProfileProps {
  id: string
  rate: number
  description: string
  created_at: Date
  book: {
    name: string
    author: string
    cover_url: string
  }
}

interface ProfileProps {
  user: {
    id: string
    name: string
    email: string
    image: string | undefined | null
    createdAt: Date
  }
  totalPagesReadUser: number
  totalBooksReviews: number
  totalAuthorsReadUser: number
  mostReadCategoryName: string
}

const formSearchSchema = z.object({
  book: z.string(),
})

type FormSearchData = z.infer<typeof formSearchSchema>

export default function Perfil() {
  const { data: session } = useSession()

  const [searchQuery, setSearchQuery] = useState('')

  const { handleSubmit, register } = useForm<FormSearchData>({
    resolver: zodResolver(formSearchSchema),
  })

  const { data: reviewsProfile } = useQuery<ReviewsProfileProps[]>({
    queryKey: ['reviews-profile', searchQuery],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/reviews-profile`,
        {
          params: {
            book: searchQuery,
          },
        },
      )
      return data.reviewsProfile
    },
  })

  const { data: profile } = useQuery<ProfileProps>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get(`${env.NEXT_PUBLIC_BASE_URL}/api/profile`)
      return data
    },
  })

  function handleSearchBooknName(data: FormSearchData) {
    setSearchQuery(data.book)
    // refetch()
  }

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ['reviews-profile'],
    })
  }, [queryClient])

  return (
    <>
      <SideBar />
      <div className="flex w-full flex-col">
        <div className="mt-[72px] flex items-center gap-3">
          <User size={32} className="text-green-100" />
          <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
            Perfil
          </h1>
        </div>
        <div className="flex flex-col gap-16 pb-10 lg:flex-row">
          <div className="mt-10 flex w-full flex-col">
            <form onSubmit={handleSubmit(handleSearchBooknName)}>
              <SearchInput
                {...register('book')}
                placeholder="Buscar livro avaliado"
              />
            </form>
            {/* <SearchInput placeholder="Buscar livro avaliado" /> */}
            {reviewsProfile &&
              reviewsProfile.map((reviewProfile) => (
                <ReviewProfile
                  key={reviewProfile.id}
                  dateReview={reviewProfile.created_at}
                  coverUrl={reviewProfile.book.cover_url}
                  titleBook={reviewProfile.book.name}
                  authorBook={reviewProfile.book.author}
                  rating={reviewProfile.rate}
                  reviewbBook={reviewProfile.description}
                />
              ))}
          </div>

          {session && (
            <div className="flex max-h-[555px] min-w-[308px] flex-col items-center border-l border-solid border-l-gray-700 px-14">
              <div className="flex flex-col items-center">
                <div className="">
                  <Image
                    src={profile?.user.image ?? ''}
                    alt={profile?.user.name ?? ''}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full bg-cover"
                  />
                </div>
                <span className="mt-5 font-nunito text-xl font-bold leading-short text-gray-100">
                  {profile?.user.name}
                </span>
                <span className="font-nunito text-sm font-normal leading-base text-gray-400">
                  membro desde {dayjs(profile?.user.createdAt).year()}
                </span>
              </div>
              <Separator.Root
                orientation="horizontal"
                decorative
                className="mt-10 h-1 w-8 rounded-full bg-white bg-gradient-to-l from-[#9694F5] from-0% to-[#7FD1CC] to-100%"
              />
              <div className="mt-14 flex flex-col gap-10">
                <ItemInfoIcon
                  icon={
                    <BookOpen size={32} className="h-8 w-8 text-green-100" />
                  }
                  info={profile?.totalPagesReadUser}
                  title="Páginas lidas"
                />
                <ItemInfoIcon
                  icon={<Books size={32} className="h-8 w-8 text-green-100" />}
                  info={profile?.totalBooksReviews}
                  title="Livros avaliados"
                />
                <ItemInfoIcon
                  icon={
                    <UserList size={32} className="h-8 w-8 text-green-100" />
                  }
                  info={profile?.totalAuthorsReadUser}
                  title="Autores lidos"
                />
                <ItemInfoIcon
                  icon={
                    <BookmarkSimple
                      size={32}
                      className="h-8 w-8 text-green-100"
                    />
                  }
                  info={profile?.mostReadCategoryName}
                  title="Categoria mais lida"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
