import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const sidebar = tv({
  base: [
    'min-w-60 rounded-xl justify-between py-10 pb-6 m-5 lg:flex flex-col bg-no-repeat bg-cover bg-center hidden bg-sidebar h-[calc(100%-40px)] items-center',
  ],
})

type SidebarType = ComponentProps<'aside'> & VariantProps<typeof sidebar>

export const SideBar = ({ className, ...props }: SidebarType) => {
  return <aside {...props} className={sidebar({ className })} />
}
