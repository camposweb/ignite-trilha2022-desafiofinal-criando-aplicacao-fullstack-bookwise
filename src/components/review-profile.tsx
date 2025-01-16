import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box } from './box'
import Image from 'next/image'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(relativeTime)

const customStyles = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#8381D9',
  inactiveFillColor: '#000000',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const reviewProfile = tv({
  slots: {
    base: 'mt-8 flex flex-col',
    date: 'font-nunito font-normal text-sm leading-base text-gray-300',
    bookCover: '',
    title: 'font-nunito font-bold leading-short text-lg text-gray-100',
    author: 'font-nunito text-gray-400 font-normal text-sm leading-base',
    review: ' text-gray-300 font-nunito font-normal text-sm leading-base pt-6',
  },
})

const { base, date, bookCover, title, author, review } = reviewProfile()

type ReviewProfileType = ComponentProps<'article'> &
  VariantProps<typeof reviewProfile>

interface ReviewProfileProps extends ReviewProfileType {
  dateReview: Date
  coverUrl: string
  titleBook: string
  authorBook: string
  rating: number
  reviewbBook: string
}

export const ReviewProfile = ({
  dateReview,
  coverUrl,
  titleBook,
  authorBook,
  rating,
  reviewbBook,
  ...props
}: ReviewProfileProps) => {
  return (
    <article {...props} className={base()}>
      <span className={date()}>
        {dayjs.utc(dateReview).isSame(dayjs(), 'day')
          ? 'Hoje'
          : dayjs.utc(dateReview).local().fromNow()}
      </span>
      <Box className="mt-2 flex w-full flex-col p-6">
        <div className="flex gap-6">
          <div className={bookCover()}>
            <Image
              src={coverUrl}
              width={98}
              height={134}
              alt="Revolução"
              className="h-[134px] w-[98px] bg-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className={title()}>{titleBook}</span>
            <span className={author()}>{authorBook}</span>
            <Rating
              value={rating}
              readOnly
              itemStyles={customStyles}
              style={{ maxWidth: 92 }}
              className="mt-auto"
            />
          </div>
        </div>
        <p className={review()}>{reviewbBook}</p>
      </Box>
    </article>
  )
}
