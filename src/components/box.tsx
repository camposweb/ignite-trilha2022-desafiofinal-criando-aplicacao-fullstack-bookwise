import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const box = tv({
  base: ['flex rounded-lg relative border-2 border-solid border-transparent'],
  variants: {
    variant: {
      primary: 'bg-gray-700',
      secondary: 'bg-gray-600 hover:border-gray-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type CardType = ComponentProps<'div'> & VariantProps<typeof box>

export const Box = ({ className, variant, ...props }: CardType) => {
  return <div {...props} className={box({ className, variant })} />
}
