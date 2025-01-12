import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Explorar } from './explorar'

export default async function PageExplorar() {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <>
        <Explorar />
      </>
    </HydrationBoundary>
  )
}
