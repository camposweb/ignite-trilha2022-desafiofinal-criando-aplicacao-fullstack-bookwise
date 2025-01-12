'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const link = tv({
  base: [
    'flex gap-4 w-full font-nunito text-base font-bold leading-base text-gray-400 transition hover:text-gray-100 data-[active=true]:text-gray-100',
    'before:content-[""] before:w-1 before:h-6 before:opacity-0 before:rounded-full before:transition',
    'before:bg-gradient-to-t from-[#9694F5] from-0% to-[#7FD1CC] to-100%',
    'data-[active=true]:before:opacity-100 hover:before:opacity-100',
    '',
  ],
})

type LinkType = ComponentProps<typeof Link> & VariantProps<typeof link>

export const NavLink = ({ className, ...props }: LinkType) => {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      data-active={pathname === props.href}
      className={link({ className })}
    />
  )
}
