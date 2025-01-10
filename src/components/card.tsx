import Image from 'next/image'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const customStyles = {
  itemShapes: ThinRoundedStar,
  activeFillColor: '#8381D9',
  inactiveFillColor: '#000000',
  activeStrokeColor: '#8381D9', // Borda para estrelas inativas
  inactiveStrokeColor: '#8381D9', // Borda para estrelas inativas
  itemStrokeWidth: 2, // Largura da borda
}

const card = tv({
  slots: {
    base: 'bg-gray-700 flex rounded-lg relative cursor-pointer py-4 px-5 gap-5 border-2 border-solid border-transparent hover:border-gray-600 transition',
    header: 'flex justify-between',
    wrapper: 'flex flex-col',
    titleBook: 'font-nunito text-base font-bold leading-short text-gray-100',
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
  title: string
  author: string
  coverUrl: string
  rating: number
  member?: string
  memberAvatar?: string
  avalaliationDate?: string
}

export const Card = ({
  title,
  author,
  coverUrl,
  rating,
  variants,
  ...props
}: CardProps) => {
  return (
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
  )
}
