import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const categories = tv({
  base: [
    'bg-transparent border border-solid border-purple-100 rounded-full py-2 px-5 transition',
    'text-purple-100 font-nunito font-normal leading-base text-base',
    'hover:text-gray-100 hover:bg-purple-200 hover:border-purple-100',
    'data-[active=true]:text-gray-100 data-[active=true]:bg-purple-200 data-[active=true]:border-transparent',
  ],
})

type CategoryType = ComponentProps<'button'> & VariantProps<typeof categories>

export const Categories = ({ className, ...props }: CategoryType) => {
  return <button {...props} className={categories({ className })} />
}
