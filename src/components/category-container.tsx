'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react'

interface CategoryContainerProps {
  children: ReactNode
}

export function CategoryContainer({ children }: CategoryContainerProps) {
  const [emblaref] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  })

  return (
    <div className="relative flex w-screen pr-24 lg:max-w-[996px] 2xl:min-w-full">
      <div ref={emblaref} className="w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}
