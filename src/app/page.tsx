import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { productsInfiniteOptions } from '@/lib/api/useProducts'
import { ProductList } from './_components/ProductList'
import styles from './page.module.scss'

// ISR: prerender with the first page baked in and revalidate periodically,
// so the HTML (with products) is served statically for a fast TTFB/LCP.
export const revalidate = 300

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery(
    productsInfiniteOptions({ rows: 8, sortBy: 'id', orderBy: 'ASC' }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.main}>
        <ProductList />
      </main>
    </HydrationBoundary>
  )
}
