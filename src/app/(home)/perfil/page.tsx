import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Perfil from './perfil'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default async function PagePerfil() {
  const session = await auth()
  const queryClient = new QueryClient()

  if (!session) {
    redirect('/')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Perfil />
      </>
    </HydrationBoundary>
  )
}
