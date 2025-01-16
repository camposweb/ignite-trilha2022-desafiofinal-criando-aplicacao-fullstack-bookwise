import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { ComponentProps, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const textInputContainer = tv({
  base: [
    'bg-gray-800 py-3 px-4 group rounded-md duration-200 border transition-colors border-solid border-gray-500 flex items-center gap-2',
    'focus-within:border-green-200',
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
    'focus:outline-0 focus-within:outline-0 focus-visible:outline-0',
    'placeholder:text-gray-400',
  ],
})

type SearchInputType = ComponentProps<'input'> &
  VariantProps<typeof searchInput>

export const SearchInput = forwardRef<HTMLInputElement, SearchInputType>(
  ({ className, ...props }: SearchInputType, ref) => {
    return (
      <TextInputContainer>
        <input {...props} ref={ref} className={searchInput({ className })} />
        <button type="submit" title="Pesquisar" className="">
          <MagnifyingGlass
            size={20}
            className="text-gray-500 transition-colors duration-200 group-focus-within:text-green-200"
          />
        </button>
      </TextInputContainer>
    )
  },
)

SearchInput.displayName = 'SearchInput'
