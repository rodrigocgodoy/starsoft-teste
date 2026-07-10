import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { fetchProducts, type OrderBy, type SortBy } from './products'

interface ProductsParams {
  rows: number
  sortBy: SortBy
  orderBy: OrderBy
}

/**
 * Infinite-query config for the products listing. Changing the sort creates a
 * new query key, so pagination resets automatically (and cached sorts return
 * instantly).
 */
export function productsInfiniteOptions({
  rows,
  sortBy,
  orderBy,
}: ProductsParams) {
  return infiniteQueryOptions({
    queryKey: ['products', { rows, sortBy, orderBy }] as const,
    queryFn: ({ pageParam, signal }) =>
      fetchProducts({ page: pageParam, rows, sortBy, orderBy }, { signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.products.length, 0)
      return loaded < lastPage.count ? allPages.length + 1 : undefined
    },
  })
}

export function useProductsInfinite(params: ProductsParams) {
  return useInfiniteQuery(productsInfiniteOptions(params))
}
