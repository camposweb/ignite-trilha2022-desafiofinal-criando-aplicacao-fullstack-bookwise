import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const box = tv({
  base: [
    'bg-gray-700 flex rounded-lg relative border-2 border-solid border-transparent',
  ],
})

type CardType = ComponentProps<'div'> & VariantProps<typeof box>

export const Box = ({ className, ...props }: CardType) => {
  return <div {...props} className={box({ className })} />
}
