import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Explorar } from './explorar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorar',
}

export default async function PageExplorar() {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['books'],
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Explorar />
      </>
    </HydrationBoundary>
  )
}
