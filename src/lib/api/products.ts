// Client for the Starsoft challenge API.
// GET /products — all params are required by the backend.

export interface Product {
  id: number
  name: string
  description: string
  /** Absolute image URL (S3). */
  image: string
  /** Decimal string, e.g. "182.00000000". */
  price: string
  createdAt: string
}

export type SortBy = 'id' | 'name' | 'price'
export type OrderBy = 'ASC' | 'DESC'

export interface ProductQuery {
  page: number
  /** Items per page. The API requires `rows >= 5`. */
  rows: number
  sortBy: SortBy
  orderBy: OrderBy
}

export interface ProductsResponse {
  products: Product[]
  /** Total number of products across all pages. */
  count: number
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://api-challenge.starsoft.games/api/v1'

export async function fetchProducts(
  { page, rows, sortBy, orderBy }: ProductQuery,
  init?: RequestInit,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    rows: String(rows),
    sortBy,
    orderBy,
  })

  const res = await fetch(`${BASE_URL}/products?${params}`, {
    ...init,
    // Server-side ISR cache (ignored by the browser). Lets the pages be
    // statically generated and revalidated instead of hitting the API per
    // request. Client fetches (load-more, sorting) stay fresh via React Query.
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`)
  }

  return res.json() as Promise<ProductsResponse>
}

/** Format an API price string for display, trimming trailing zeros. */
export function formatPrice(price: string): string {
  const value = Number(price)
  if (!Number.isFinite(value)) return price
  return value.toLocaleString('en-US', { maximumFractionDigits: 4 })
}
