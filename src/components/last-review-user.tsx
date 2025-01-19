import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box } from './box'
import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
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
  inactiveFillColor: '#252D4A',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const lastReviewUsar = tv({
  slots: {
    base: 'w-full flex py-5 px-6 gap-6 rounded-lg',
    header: '',
    imageBook: 'h-[152px] min-w-[108px] rounded bg-cover',
    dateReview: 'font-nunito font-normal text-sm leading-base text-gray-300',
    titleBook:
      'mt-3 font-nunito font-bold leading-short text-base text-gray-100',
    authorBook: 'text-gray-400 font-nunito font-normal text-sm leading-base',
    description:
      'mt-6 text-gray-300 font-nunito font-normal leading-base text-sm',
  },
})

const { base, imageBook, titleBook, authorBook, description, dateReview } =
  lastReviewUsar()

type lastReviewUserType = ComponentProps<typeof Box> &
  VariantProps<typeof lastReviewUsar>

interface lastReviewUserProps extends lastReviewUserType {
  image: string
  date: Date
  rate: number
  title: string
  author: string
  review: string
}

export const LastReviewUser = ({
  image,
  date,
  rate,
  title,
  author,
  review,
  ...props
}: lastReviewUserProps) => {
  return (
    <>
      <div className="flex justify-between">
        <span className="font-nunito text-base font-normal leading-base text-gray-100">
          Sua última leitura
        </span>
        <Link
          href={'/perfil'}
          className="text-purple-10 flex items-center gap-2 rounded-sm px-3 py-1 font-nunito text-sm font-bold leading-base text-purple-100 hover:bg-purple-100/5"
        >
          Ver Todas
          <CaretRight size={16} />
        </Link>
      </div>
      <Box {...props} variant="secondary">
        <figure className={base()}>
          <Image
            src={image}
            width={108}
            height={152}
            alt={`${title}`}
            className={imageBook()}
          />
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between">
              <span className={dateReview()}>
                {dayjs.utc(date).isSame(dayjs(), 'day')
                  ? 'Hoje'
                  : dayjs.utc(date).local().fromNow()}
              </span>
              <Rating
                value={rate}
                readOnly
                itemStyles={customStyles}
                style={{ maxWidth: 92 }}
              />
            </div>

            <span className={titleBook()}>{title}</span>
            <span className={authorBook()}>{author}</span>

            <p className={description()}>{review}</p>
          </div>
        </figure>
      </Box>
    </>
  )
}
