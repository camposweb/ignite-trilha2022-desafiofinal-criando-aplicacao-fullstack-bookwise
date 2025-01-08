import Link from 'next/link'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const link = tv({})

type LinkType = ComponentProps<typeof Link> & VariantProps<typeof link>

export const Link = ({ className, ...props }: LinkType) => {
  return <Link {...props} className={link({ className })} />
}
