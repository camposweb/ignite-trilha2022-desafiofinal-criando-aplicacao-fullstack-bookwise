'use client'

import { SideBar } from '@/components/sidebar'

/* interface RecentReviewsProps {
  id: string
  userAvatar: string
  userName: string
  dateReview: string
  coverUrl: string
  title: string
  author: string
  rating: number
  userReview: string
} */

/* interface BooksProps {
  id: string
  name: string
  author: string
  sinopse: string
  cover_url: string
  total_pages: number
  averageRating: number
}

export interface UserProps {
  id: string
  name: string
  image: string
}

interface LastReviewUserProps {
  id: string
  rate: number
  description: string
  created_at: Date
  book: BooksProps
}

interface RecentReviewsProps {
  id: string
  rate: number
  description: string
  created_at: Date
  book: BooksProps
  user: UserProps
}

export interface RatingsProps {
  id: string
  rate: number
  description: string
  created_at: Date
  user: UserProps
}

export interface CategoriesProps {
  category: {
    id: string
    name: string
  }
}

interface PopularBooksProps {
  id: string
  name: string
  author: string
  cover_url: string
  averageRating: number
  total_pages: number
  ratings: RatingsProps[]
  categories: CategoriesProps[]
} */

export default function Home() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    return null
  }
  // const { data: session } = useSession()

  /* const { data: lastReviewUser, isLoading } = useQuery<LastReviewUserProps>({
    queryKey: ['last-review-user'],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/last-review-user`,
      )
      return data.lastReviewUser
    },
    enabled: !!session,
  })

  const { data: recentsReviews } = useQuery<RecentReviewsProps[]>({
    queryKey: ['recent-reviews'],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/recent-reviews`,
      )
      return data.recentsReviews
    },
  })

  const { data: popularBooks } = useQuery<PopularBooksProps[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const { data } = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/api/popular-books`,
      )
      return data.popularBooks
    },
  }) */

  return (
    <>
      <SideBar />
      {/* <div className="flex w-full flex-col">
        <div className="mt-[72px] flex items-center gap-3">
          <ChartLine size={32} className="text-green-100" />
          <h1 className="font-nunito text-2xl font-bold leading-base text-gray-200">
            Início
          </h1>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-16 lg:flex-row">
          <article className="mb-10 flex w-full max-w-[608px] flex-col gap-3 2xl:max-w-none">
            {session && lastReviewUser && !isLoading && (
              <LastReviewUser
                image={lastReviewUser?.book.cover_url ?? ''}
                date={lastReviewUser?.created_at ?? new Date()}
                rate={lastReviewUser?.rate ?? 0}
                title={lastReviewUser?.book.name ?? ''}
                author={lastReviewUser?.book.author ?? ''}
                review={lastReviewUser?.description ?? ''}
              />
            )}

            <span className="font-nunito text-base font-normal leading-base text-gray-100">
              Avaliações mais recentes
            </span>
            {recentsReviews &&
              recentsReviews.map((recentreview) => (
                <RecentReviews
                  key={recentreview.id}
                  title={recentreview.book.name}
                  author={recentreview.book.author}
                  coverUrl={recentreview.book.cover_url}
                  userAvatar={recentreview.user.image}
                  userName={recentreview.user.name}
                  dateReview={recentreview.created_at}
                  userReview={recentreview.description}
                  rating={recentreview.rate}
                  className="hover:border-gray-600"
                />
              ))}
          </article>
          <section className="mr-24">
            <div className="flex justify-between">
              <span className="font-nunito text-base font-normal leading-base text-gray-100">
                Livros Populares
              </span>
              <Link
                href={'/explorar'}
                className="flex items-center gap-3 font-nunito text-sm font-bold leading-base text-purple-100"
              >
                Ver Todos
                <CaretRight size={16} />
              </Link>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {popularBooks &&
                popularBooks.map((popularBook) => {
                  const categories = popularBook.categories.map(
                    (category) => category.category.name,
                  )
                  return (
                    <Card
                      key={popularBook.id}
                      bookId={popularBook.id}
                      title={popularBook.name}
                      author={popularBook.author}
                      coverUrl={popularBook.cover_url}
                      rating={popularBook.averageRating ?? 0}
                      totalPages={popularBook.total_pages}
                      ratings={popularBook.ratings}
                      categories={categories}
                    />
                  )
                })}
            </div>
          </section>
        </div>
      </div> */}
    </>
  )
}
