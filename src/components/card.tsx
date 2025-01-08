'use client'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import avatar from '../app/assets/avatar.png'
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
      recents: 'flex-col',
      populars: '',
    },
  },
})

type CardType = ComponentProps<'figure'> & VariantProps<typeof card>

const {
  base,
  header,
  titleBook,
  authorBook,
  footer,
  wrapper,
  sinopse,
  footerSinopse,
} = card()

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
  member,
  avalaliationDate,
  variants,
  ...props
}: CardProps) => {
  const [textExpand, setTextExpand] = useState(false)

  const text = `Semper et sapien proin vitae nisi. Feugiat neque integer donec
                  et aenean posuere amet ultrices. Cras fermentum id pulvinar
                  varius leo a in. Amet libero pharetra nunc elementum fringilla
                  velit ipsum. Sed vulputate massa velit nibh`

  const limit = 200

  function handleExpandText() {
    setTextExpand(!textExpand)
  }
  return (
    <figure {...props} className={base({ variants })}>
      {member ? (
        <>
          <header className={header()}>
            <div className="flex gap-2">
              <div className="h-10 w-10">
                <Image src={avatar} alt={member} width={40} height={40} />
              </div>
              <div className="flex flex-col">
                <span className="font-nunito text-base font-normal leading-base text-gray-100">
                  {member}
                </span>
                <span className="text-sm font-normal leading-base text-gray-400">
                  {avalaliationDate}
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
            <Image src={coverUrl} alt={coverUrl} width={108} height={152} />
            <div className={wrapper()}>
              <h1 className={titleBook()}>{title}</h1>
              <h3 className={authorBook()}>{author}</h3>
              <footer className={footerSinopse()}>
                <p className={sinopse()}>
                  {textExpand ? text : `${text.slice(0, limit)}...`}
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
        </>
      ) : (
        <>
          <Image src={coverUrl} alt={coverUrl} width={64} height={94} />
          <div className={wrapper()}>
            <figcaption>
              <h1 className={titleBook()}>{title}</h1>
              <h3 className={authorBook()}>{author}</h3>
            </figcaption>
            <footer className={footer()}>
              <Rating
                value={4}
                readOnly
                itemStyles={customStyles}
                style={{ maxWidth: 92 }}
              />
            </footer>
          </div>
        </>
      )}
    </figure>
  )
}
