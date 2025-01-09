'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ReactNode, useEffect, useState } from 'react'

interface CategoryContainerProps {
  children: ReactNode
}

export function CategoryContainer({ children }: CategoryContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [screenResolution, setScreenResolution] = useState(3)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 6,
      spacing: 12,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 5,
          spacing: 24,
        },
      },
      '(min-width: 1536px)': {
        slides: {
          perView: 13,
          spacing: 24,
        },
      },
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.screen.width < 768) {
        setScreenResolution(3)
      } else if (window.screen.width < 1024) {
        setScreenResolution(5)
      } else if (window.screen.width < 1536) {
        setScreenResolution(8)
      } else {
        setScreenResolution(3)
      }
    }
  }, [])

  return (
    <div className="relative flex w-screen pr-24 lg:max-w-[996px] 2xl:min-w-full">
      <div ref={sliderRef} className="keen-slider">
        {children}
      </div>
    </div>
  )
}
