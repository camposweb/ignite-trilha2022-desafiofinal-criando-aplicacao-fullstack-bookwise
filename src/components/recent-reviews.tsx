'use client'
import { tv, VariantProps } from 'tailwind-variants'
import { Box } from './box'
import { ComponentProps, useState } from 'react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

const customStyles = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#8381D9',
  inactiveFillColor: '#000000',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const recentReviews = tv({
  extend: Box,
  slots: {
    base: 'flex flex-col w-full gap-5 py-4 px-5 hover:border-gray-600 transition',
    header: 'flex justify-between',
    wrapper: 'flex flex-col',
    titleBook: 'font-nunito text-base font-bold leading-short text-gray-100',
    authorBook: 'text-sm font-normal leading-base text-gray-400',
    footer: 'mt-auto flex w-full',
    review: 'mt-auto flex w-full',
    sinopse: 'font-nunito text-sm font-normal text-gray-300 mt-7',
  },
})

const {
  base,
  header,
  wrapper,
  titleBook,
  authorBook,
  footer,
  // review,
  sinopse,
} = recentReviews()

type RecentReviewsType = ComponentProps<typeof Box> &
  VariantProps<typeof recentReviews>

interface RecentReviewsProps extends RecentReviewsType {
  userAvatar: string
  userName: string
  dateReview: Date
  coverUrl: string
  title: string
  author: string
  rating: number
  userReview: string
}

export const RecentReviews = ({
  userAvatar,
  userName,
  dateReview,
  coverUrl,
  title,
  author,
  rating,
  userReview,
  ...props
}: RecentReviewsProps) => {
  const [textExpand, setTextExpand] = useState(false)

  const limit = 200

  function handleExpandText() {
    setTextExpand(!textExpand)
  }
  return (
    <Box {...props}>
      <figure className={base()}>
        <header className={header()}>
          <div className="flex gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black bg-gradient-to-t from-[#9694F5] from-0% to-[#7FD1CC] to-100%">
              <Image
                src={userAvatar}
                alt={userName}
                width={40}
                height={40}
                quality={100}
                className="h-10 w-10 rounded-full bg-black bg-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-nunito text-base font-normal leading-base text-gray-100">
                {userName}
              </span>
              <span className="text-sm font-normal leading-base text-gray-400">
                {dayjs(dateReview).fromNow()}
              </span>
            </div>
          </div>
          <div>
            <Rating
              value={rating}
              readOnly
              itemStyles={customStyles}
              style={{ maxWidth: 92 }}
            />
          </div>
        </header>
        <div className="flex gap-5">
          <Image
            src={coverUrl}
            alt={coverUrl}
            width={108}
            height={152}
            className="h-[152px] w-[108px]"
          />
          <div className={wrapper()}>
            <h1 className={titleBook()}>{title}</h1>
            <h3 className={authorBook()}>{author}</h3>
            <footer className={footer()}>
              <p className={sinopse()}>
                {textExpand ? userReview : `${userReview.slice(0, limit)}...`}
                <button
                  onClick={handleExpandText}
                  className="ml-2 font-nunito text-sm font-bold leading-base text-purple-100"
                >
                  {textExpand ? 'Ver menos' : 'Ver mais'}
                </button>
              </p>
            </footer>
          </div>
        </div>
      </figure>
    </Box>
  )
}
