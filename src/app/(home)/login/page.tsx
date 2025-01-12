import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Login from './login'

export default async function PageLogin() {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Login />
      </>
    </HydrationBoundary>
  )
}
