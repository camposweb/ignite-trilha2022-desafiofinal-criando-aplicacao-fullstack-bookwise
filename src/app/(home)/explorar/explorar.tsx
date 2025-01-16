'use client'
import { Card } from '@/components/card'
import { Categories } from '@/components/categories'
import { CategoryContainer } from '@/components/category-container'
import { SearchInput } from '@/components/search-input'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { Binoculars } from '@phosphor-icons/react/dist/ssr'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { RatingsProps } from '../home'
import { SideBar } from '@/components/sidebar'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface CategoriesProps {
  id: string
  name: string
}
interface BooksProps {
  id: string
  name: string
  author: string
  sinopse: string
  cover_url: string
  total_pages: number
  averageRating: number
  ratings: RatingsProps[]
  categories: {
    category: {
      id: string
      name: string
    }
  }[]
}

const formSearchSchema = z.object({
  search: z.string(),
})

type FormSearchData = z.infer<typeof formSearchSchema>

export function Explorar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  const { handleSubmit, register } = useForm<FormSearchData>({
    resolver: zodResolver(formSearchSchema),
  })

  const { data: categories } = useQuery<CategoriesProps[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      )
      return data.categories
    },
  })

  const categoryName = searchParams.get('categories') || undefined

  const { data: books } = useQuery<BooksProps[]>({
    queryKey: ['books', categoryName, searchQuery],
    queryFn: async () => {
      const { data } = await api.get(`${env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        params: {
          categories: categoryName,
          search: searchQuery,
        },
      })
      return data.books
    },
  })

  const handleCategories = useCallback(
    (categories: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (categories === 'Tudo') {
        params.delete(categories, value)
      } else {
        params.set(categories, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  function handleSearchTitleOrAuthor(data: FormSearchData) {
    setSearchQuery(data.search)
    // refetch()
  }

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ['books'],
    })
  }, [queryClient])

  return (
    <>
      <SideBar />
      <div className="flex w-full flex-col">
        <div className="mt-[72px] flex flex-col items-center gap-3 pr-24 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            <Binoculars size={32} className="text-green-100" />
            <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
              Explorar
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSearchTitleOrAuthor)}>
            <SearchInput
              {...register('search')}
              placeholder="Buscar livro ou autor"
              className="w-full lg:w-[433px]"
            />
          </form>
        </div>
        <div className="mt-10">
          <CategoryContainer>
            <div className="flex gap-4">
              <Categories
                className="min-w-0 flex-[0_0_25%] lg:flex-[0_0_15%]"
                onClick={() => {
                  setSearchQuery('')
                  router.push(pathname)
                }}
                data-active={
                  pathname === '/explorar' && !searchParams.get('categories')
                }
              >
                Tudo
              </Categories>
              {categories &&
                categories.map((category) => (
                  <Categories
                    key={category.id}
                    onClick={() => {
                      setSearchQuery('')
                      router.push(
                        pathname +
                          '?' +
                          handleCategories('categories', `${category.name}`),
                      )
                    }}
                    data-active={
                      searchParams.get('categories') === `${category.name}`
                    }
                    className="min-w-0 flex-[0_0_25%] lg:flex-[0_0_15%]"
                  >
                    {category.name}
                  </Categories>
                ))}
            </div>
          </CategoryContainer>
        </div>
        <div className="mr-24 mt-12 grid grid-cols-1 gap-5 pb-10 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5">
          {books &&
            books.map((book) => {
              const categories = book.categories.map(
                (category) => category.category.name,
              )
              return (
                <Card
                  key={book.id}
                  bookId={book.id}
                  title={book.name}
                  author={book.author}
                  coverUrl={book.cover_url}
                  rating={book.averageRating ?? 0}
                  totalPages={book.total_pages}
                  categories={categories}
                  ratings={book.ratings}
                />
              )
            })}
        </div>
      </div>
    </>
  )
}
