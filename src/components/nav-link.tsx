'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const link = tv({
  base: [
    'flex gap-2 font-nunito text-base font-bold leading-base text-gray-400 transition hover:text-gray-100 data-[active=true]:text-gray-100',
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
