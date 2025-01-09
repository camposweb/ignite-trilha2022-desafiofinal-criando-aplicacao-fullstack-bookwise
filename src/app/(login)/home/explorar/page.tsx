import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function PageExplorar() {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>{/* <Home /> */}</>
    </HydrationBoundary>
  )
}
