'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { NavLink } from './nav-link'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@phosphor-icons/react/dist/ssr'
import logoBookWise from '../app/assets/logo-bookwise.svg'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const sidebar = tv({
  base: [
    'min-w-60 rounded-xl justify-between py-10 pb-6 m-5 lg:flex flex-col bg-no-repeat bg-cover bg-center hidden bg-sidebar h-[calc(100%-40px)] items-center',
  ],
})

type SidebarType = ComponentProps<'aside'> & VariantProps<typeof sidebar>

export const SideBar = ({ className, ...props }: SidebarType) => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <aside {...props} className={sidebar({ className })}>
      <Link href={'/'} className="flex items-center gap-2">
        <Image
          src={logoBookWise}
          alt="Logo"
          width={32}
          height={128}
          quality={100}
          className="h-8 w-32"
        />
      </Link>
      <nav className="mb-auto mt-16 flex flex-col gap-4">
        <NavLink href={'/'}>
          <ChartLineUp size={24} />
          Início
        </NavLink>
        <NavLink href={'/explorar'}>
          <Binoculars size={24} />
          Explorar
        </NavLink>
        {session && (
          <NavLink href={'/perfil'}>
            <User size={24} />
            Perfil
          </NavLink>
        )}
      </nav>
      <footer className="flex justify-end">
        {session ? (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 font-nunito text-base font-bold leading-base text-gray-100"
          >
            <span className="">
              <Image
                src={session.user?.image ?? ''}
                width={32}
                height={32}
                quality={100}
                alt={session.user?.name ?? ''}
                className="h-8 w-8 rounded-full bg-cover"
              />
            </span>
            {session.user?.name}
            <SignOut size={24} className="text-[#F75A68]" />
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="flex gap-2 font-nunito text-base font-bold leading-base text-gray-100"
          >
            Fazer Login
            <SignIn size={24} className="text-green-100" />
          </button>
        )}
      </footer>
    </aside>
  )
}
