import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Home from './home'

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
