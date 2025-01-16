'use client'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { ComponentProps, useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { X, BookmarkSimple, BookOpen } from '@phosphor-icons/react/dist/ssr'
import { Box } from './box'
import { Reviews } from './reviews'
import { NewReview } from './new-review'
import { RatingsProps } from '@/app/(home)/home'
import { useSession } from 'next-auth/react'
import { DialogLogin } from './dialog-login'

const customStyles = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#8381D9',
  inactiveFillColor: '#181C2A',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const card = tv({
  slots: {
    base: 'bg-gray-700 flex rounded-lg relative cursor-pointer py-4 px-5 gap-5 border-2 border-solid border-transparent hover:border-gray-600 transition',
    header: 'flex justify-between',
    wrapper: 'flex flex-col',
    titleBook:
      'font-nunito text-base font-bold leading-short text-gray-100 line-clamp-2',
    authorBook: 'text-sm font-normal leading-base text-gray-400',
    footer: 'mt-auto flex w-full',
    footerSinopse: 'mt-auto flex w-full',
    sinopse: 'font-nunito text-sm font-normal text-gray-300 line-clamp-4',
  },
  variants: {
    variants: {
      read: '',
    },
  },
})

type CardType = ComponentProps<'figure'> & VariantProps<typeof card>

const { base, titleBook, authorBook, footer, wrapper } = card()

interface CardProps extends CardType {
  bookId: string
  title: string
  author: string
  coverUrl: string
  rating: number
  memberAvatar?: string
  avalaliationDate?: string
  totalPages: number
  ratings: RatingsProps[]
  categories: string[]
}

export const Card = ({
  bookId,
  title,
  author,
  coverUrl,
  rating,
  totalPages,
  ratings,
  categories,
  variants,
  ...props
}: CardProps) => {
  const [newReaviewExpand, setNewReaviewExpand] = useState(false)
  const [animate, setAnimate] = useState(false)

  const { data: session } = useSession()

  function handleNewReaviewExpand() {
    setAnimate(true)
    setNewReaviewExpand(true)
  }
  function handleCloseNewReaviewExpand() {
    setAnimate(false)
    setNewReaviewExpand(false)
  }

  const existsRatingUser = ratings.filter(
    (rating) => rating.user.id === session?.user?.id,
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <figure {...props} className={base({ variants })}>
          <Image
            src={coverUrl}
            alt={coverUrl}
            width={64}
            height={94}
            className="h-[94px] w-[64px]"
          />
          <div className={wrapper()}>
            <figcaption>
              <h1 className={titleBook()}>{title}</h1>
              <h3 className={authorBook()}>{author}</h3>
            </figcaption>
            <footer className={footer()}>
              <Rating
                value={rating}
                readOnly
                itemStyles={customStyles}
                style={{ maxWidth: 92 }}
              />
            </footer>
          </div>
        </figure>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.DialogOverlay className="fixed inset-0 z-0 bg-gray-800/60 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed right-0 top-0 h-screen overflow-auto bg-gray-800 px-12 animate-duration-500 animate-ease-linear data-[state=closed]:animate-fade-left data-[state=open]:animate-fade-left data-[state=open]:animate-delay-100 data-[state=closed]:animate-reverse data-[state=open]:animate-duration-500 data-[state=closed]:animate-ease-in-out data-[state=open]:animate-ease-in-out lg:max-w-[660px] 2xl:max-w-[660px]">
          <Dialog.Title className="sr-only">
            Dados do livro selecionado
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Dados do Livro
          </Dialog.Description>
          <Box className="mt-16 inline-flex w-full flex-col rounded-xl bg-gray-700 px-8 pt-6">
            <div className="flex gap-8">
              <div>
                <Image
                  src={coverUrl}
                  width={171.65}
                  height={242}
                  quality={100}
                  alt={title}
                  className="h-[242] w-[171.65px] rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-nunito text-lg font-bold leading-short text-gray-100">
                  {title}
                </span>
                <span className="font-nunito text-base font-normal leading-base text-gray-300">
                  {author}
                </span>
                <footer className="mt-auto">
                  <span>
                    <Rating
                      value={rating}
                      readOnly
                      itemStyles={customStyles}
                      style={{ maxWidth: 92 }}
                    />
                  </span>
                  <span className="font-nunito text-sm font-normal leading-base text-gray-400">
                    {ratings.length === 1 && `${ratings.length} avaliação`}
                    {ratings.length > 1 && `${ratings.length} avaliações`}
                    {ratings.length < 1 && `Sem avaliações`}
                    {ratings.length === null &&
                      `${ratings.length} Sem avaliações`}
                  </span>
                </footer>
              </div>
            </div>
            <div className="mt-10 flex">
              <div className="flex w-full items-center gap-14 border-t border-gray-600 py-6">
                <div className="flex items-center gap-4">
                  <BookmarkSimple
                    size={24}
                    className="h-6 w-6 text-green-100"
                  />
                  <div className="flex flex-col">
                    <span className="font-nunito text-sm font-normal leading-base text-gray-300">
                      Categoria
                    </span>
                    <span className="flex flex-wrap font-nunito text-base font-bold leading-short text-gray-200">
                      {categories.length > 1 && categories.join(', ')}
                      {categories.length === 1 && categories}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BookOpen size={24} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="font-nunito text-sm font-normal leading-base text-gray-300">
                      Páginas
                    </span>
                    <span className="font-nunito text-base font-bold leading-short text-gray-200">
                      {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <div className="mt-10 flex justify-between">
            <span className="font-nunito text-sm font-normal leading-base text-gray-200">
              Avaliações
            </span>
            {!session && <DialogLogin />}
            {session && (
              <button
                onClick={handleNewReaviewExpand}
                className="font-nunito text-base font-bold leading-base text-purple-100"
              >
                {existsRatingUser.length === 0 ? 'Avaliar' : ''}
                {existsRatingUser.length > 0 && ''}
              </button>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-3 pb-5">
            {session && newReaviewExpand && (
              <NewReview
                onClose={handleCloseNewReaviewExpand}
                bookId={bookId}
                animate={animate}
              />
            )}
            {ratings.map((rating) => (
              <Reviews
                key={rating.id}
                userAvatar={rating.user.image}
                userName={rating.user.name}
                dateReview={rating.created_at}
                userRate={rating.rate}
                userReview={rating.description}
                className="first:bg-gray-600"
              />
            ))}
          </div>
          <Dialog.Close asChild>
            <button className="absolute right-12 top-6 inline-flex data-[state=closed]:animate-fade-left">
              <X size={24} className="text-gray-400" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
