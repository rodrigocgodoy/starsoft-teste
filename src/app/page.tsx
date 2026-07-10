import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { productsInfiniteOptions } from '@/lib/api/useProducts'
import { ProductList } from './_components/ProductList'
import styles from './page.module.scss'

// SSR per request so the first page of products ships in the HTML.
export const dynamic = 'force-dynamic'

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
