'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { formatPrice, type Product } from '@/lib/api/products'
import { useProductsInfinite } from '@/lib/api/useProducts'
import { useCart } from '@/lib/cart/useCart'
import styles from './ProductList.module.scss'

// Interaction-gated modal — its own client-only chunk.
const ProductModal = dynamic(
  () => import('./ProductModal').then(m => m.ProductModal),
  { ssr: false },
)

const ROWS = 8

export function ProductList() {
  const { addItem } = useCart()
  const [selected, setSelected] = useState<Product | null>(null)

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useProductsInfinite({ rows: ROWS, sortBy: 'id', orderBy: 'ASC' })

  const products = data?.pages.flatMap(page => page.products) ?? []
  const count = data?.pages[0]?.count ?? 0

  if (isError && products.length === 0) {
    return (
      <div className={styles.state} role="alert">
        <p>Não foi possível carregar os produtos.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {isPending
          ? Array.from({ length: ROWS }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product, index) => (
              <ProductCard
                key={product.id}
                title={product.name}
                description={product.description}
                price={formatPrice(product.price)}
                image={{ src: product.image, alt: product.name }}
                currencyIconSrc="/products/eth-icon.png"
                priority={index < 4}
                onBuy={origin => addItem(product, origin)}
                onSelect={() => setSelected(product)}
              />
            ))}
      </div>

      {products.length > 0 && (
        <div className={styles.more}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: hasNextPage
                  ? `${count ? (products.length / count) * 100 : 0}%`
                  : '100%',
              }}
            />
          </div>
          {hasNextPage ? (
            <button
              type="button"
              className={styles.loadButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              Carregar mais
            </button>
          ) : (
            <p className={styles.doneButton}>Você já viu tudo</p>
          )}
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden>
      <div className={styles.skeletonMedia} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLineShort} />
      <div className={styles.skeletonButton} />
    </div>
  )
}
