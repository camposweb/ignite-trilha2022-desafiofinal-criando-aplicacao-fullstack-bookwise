import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Home from './home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Início',
}

export default async function PageHome() {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Home />
      </>
    </HydrationBoundary>
  )
}
