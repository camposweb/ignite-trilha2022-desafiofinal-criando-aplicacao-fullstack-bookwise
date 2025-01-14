'use client'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box } from './box'
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
  inactiveFillColor: '#181C2A',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const reviews = tv({
  slots: {
    base: 'flex p-6 flex-col w-full',
    header: 'flex justify-between',
    avatar:
      'flex h-11 w-11 items-center justify-center rounded-full bg-black bg-gradient-to-t from-[#9694F5] from-0% to-[#7FD1CC] to-100%',
    description: 'font-nunito text-sm font-normal leading-base text-gray-300',
  },
})

const { base, header, avatar, description } = reviews()

type ReviewsType = ComponentProps<typeof Box> & VariantProps<typeof reviews>

interface ReviewsProps extends ReviewsType {
  userAvatar: string
  userName: string
  dateReview: Date
  userRate: number
  userReview: string
}

export const Reviews = ({
  userAvatar,
  userName,
  dateReview,
  userRate,
  userReview,
  ...props
}: ReviewsProps) => {
  return (
    <Box {...props}>
      <figure className={base()}>
        <div className={header()}>
          <div className="flex gap-4">
            <div className={avatar()}>
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
                {dayjs.utc(dateReview).isSame(dayjs(), 'day')
                  ? 'Hoje'
                  : dayjs.utc(dateReview).local().fromNow()}
              </span>
            </div>
          </div>
          <div>
            <Rating
              value={userRate}
              readOnly
              itemStyles={customStyles}
              style={{ maxWidth: 92 }}
            />
          </div>
        </div>
        <div className="mt-5">
          <p className={description()}>{userReview}</p>
        </div>
      </figure>
    </Box>
  )
}
