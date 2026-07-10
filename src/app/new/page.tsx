import type { Metadata } from 'next'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { productsInfiniteOptions } from '@/lib/api/useProducts'
import { Explorer } from './_components/Explorer'

export const metadata: Metadata = {
  title: 'Explorar',
  description: 'Explore a coleção com ordenação e scroll infinito.',
}

// ISR: prerender the default sort and revalidate periodically for a fast TTFB.
export const revalidate = 300

export default async function NewPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery(
    productsInfiniteOptions({ rows: 8, sortBy: 'id', orderBy: 'ASC' }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Explorer />
    </HydrationBoundary>
  )
}
