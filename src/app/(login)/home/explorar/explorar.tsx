'use client'
import { Card } from '@/components/card'
import { Categories } from '@/components/categories'
import { CategoryContainer } from '@/components/category-container'
import { SearchInput } from '@/components/search-input'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { Binoculars } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import 'keen-slider/keen-slider.min.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface BooksProps {
  id: string
  name: string
  author: string
  sinopse: string
  cover_url: string
  total_pages: number
}

interface CategoriesProps {
  id: string
  name: string
}

export function Explorar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [getBooks, setGetBooks] = useState<BooksProps[]>([])

  const { data: categories } = useQuery<CategoriesProps[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      )
      return data.categories
    },
  })

  const categoryName = searchParams.get('categories') || ''

  const { data: books } = useQuery<BooksProps[]>({
    queryKey: ['books', categoryName],
    queryFn: async () => {
      const { data } = await api.get(`${env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        params: {
          categories: categoryName,
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
  console.log('Pathname:', pathname)
  console.log('SearchParams:', searchParams.toString())

  return (
    <div className="flex w-full flex-col">
      <div className="mt-[72px] flex flex-col items-center gap-3 pr-24 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-100" />
          <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
            Explorar
          </h1>
        </div>
        <SearchInput
          placeholder="Buscar livro ou autor"
          className="w-full lg:w-[433px]"
        />
      </div>
      <div className="keen-slider__slide mt-10 flex gap-3">
        <CategoryContainer>
          <Categories
            className="keen-slider__slide"
            onClick={() => {
              router.push(pathname)
            }}
            data-active={
              pathname === '/home/explorar' && !searchParams.get('categories')
            }
          >
            Tudo
          </Categories>
          {categories &&
            categories.map((category) => (
              <>
                <Categories
                  key={category.id}
                  onClick={() => {
                    router.push(
                      pathname +
                        '?' +
                        handleCategories('categories', `${category.name}`),
                    )
                  }}
                  data-active={
                    searchParams.get('categories') === `${category.name}`
                  }
                  className="keen-slider__slide"
                >
                  {category.name}
                </Categories>
              </>
            ))}
        </CategoryContainer>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-5 pb-10 pr-24 2xl:grid-cols-5">
        {books &&
          books.map((book) => (
            <Card
              key={book.id}
              title={book.name}
              author={book.author}
              coverUrl={book.cover_url}
              rating={4}
            />
          ))}
      </div>
    </div>
  )
}
