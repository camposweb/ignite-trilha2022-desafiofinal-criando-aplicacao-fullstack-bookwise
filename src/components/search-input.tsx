import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const textInputContainer = tv({
  base: [
    'bg-gray-800 py-3 px-4 rounded-md border border-solid border-gray-500 flex items-center',
    'has-[input:focus]:border-green-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  variants: {},
})

type TextInputContainerType = ComponentProps<'div'> &
  VariantProps<typeof textInputContainer>

const TextInputContainer = ({
  className,
  ...props
}: TextInputContainerType) => {
  return <div className={textInputContainer({ className })} {...props} />
}

const searchInput = tv({
  base: [
    'font-nunito font-normal text-sm leading-base w-full bg-transparent border-0 text-gray-200',
    'focus:outline-0',
    'placeholder:text-gray-400',
  ],
})

type SearchInputType = ComponentProps<'input'> &
  VariantProps<typeof searchInput>

export const SearchInput = ({ className, ...props }: SearchInputType) => {
  return (
    <TextInputContainer>
      <input {...props} className={searchInput({ className })} />
      <span className="">
        <MagnifyingGlass size={20} className="text-gray-500" />
      </span>
    </TextInputContainer>
  )
}
