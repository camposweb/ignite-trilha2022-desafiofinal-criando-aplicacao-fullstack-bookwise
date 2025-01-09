import { SideBar } from '@/components/sidebar'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Binoculars, ChartLineUp, SignIn } from '@phosphor-icons/react/dist/ssr'
import logoBookWise from '../../assets/logo-bookwise.svg'
import Image from 'next/image'
import { NavLink } from '@/components/nav-link'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="flex h-screen gap-16">
      <SideBar className="">
        <Link href={''} className="flex items-center gap-2">
          <Image src={logoBookWise} alt="Logo" className="h-8 w-32" />
        </Link>
        <nav className="mb-auto mt-16 flex flex-col gap-4">
          <NavLink href={'/home'}>
            {/* <span className="mr-2 w-1 rounded-full bg-gradient-to-b from-[#7FD1CC] to-[#9694F5]" /> */}
            <ChartLineUp size={24} />
            Início
          </NavLink>
          <NavLink href={'/home/explorar'}>
            <Binoculars size={24} />
            Explorar
          </NavLink>
        </nav>
        <footer className="flex justify-end">
          <Link
            href={''}
            className="flex gap-2 font-nunito text-base font-bold leading-base text-gray-100"
          >
            Fazer Login
            <SignIn size={24} className="text-green-100" />
          </Link>
        </footer>
      </SideBar>
      {children}
    </main>
  )
}
