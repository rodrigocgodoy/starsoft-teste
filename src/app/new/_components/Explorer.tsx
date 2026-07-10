'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ProductCard } from '@/components/ui/ProductCard'
import {
  formatPrice,
  type OrderBy,
  type Product,
  type SortBy,
} from '@/lib/api/products'
import { useProductsInfinite } from '@/lib/api/useProducts'
import { useCart } from '@/lib/cart/useCart'
import { ProductModal } from '../../_components/ProductModal'
import { SortSelect } from './SortSelect'
import styles from './Explorer.module.scss'

const ROWS = 8

interface SortConfig {
  value: string
  label: string
  sortBy: SortBy
  orderBy: OrderBy
}

const SORT_OPTIONS: SortConfig[] = [
  { value: 'featured', label: 'Em destaque', sortBy: 'id', orderBy: 'ASC' },
  { value: 'name-asc', label: 'Nome (A–Z)', sortBy: 'name', orderBy: 'ASC' },
  { value: 'name-desc', label: 'Nome (Z–A)', sortBy: 'name', orderBy: 'DESC' },
  { value: 'price-asc', label: 'Menor preço', sortBy: 'price', orderBy: 'ASC' },
  {
    value: 'price-desc',
    label: 'Maior preço',
    sortBy: 'price',
    orderBy: 'DESC',
  },
]

export function Explorer() {
  const { addItem } = useCart()
  const [sortValue, setSortValue] = useState('featured')
  const [selected, setSelected] = useState<Product | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const sort = SORT_OPTIONS.find(o => o.value === sortValue) ?? SORT_OPTIONS[0]

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProductsInfinite({
    rows: ROWS,
    sortBy: sort.sortBy,
    orderBy: sort.orderBy,
  })

  const products = data?.pages.flatMap(page => page.products) ?? []
  const count = data?.pages[0]?.count ?? 0

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Infinite scroll: load the next page as the sentinel nears the viewport.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '600px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  function selectSort(next: string) {
    if (next === sortValue) return
    setSortValue(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.sort}>
          <span className={styles.sortLabel}>Ordenar por</span>
          <SortSelect
            options={SORT_OPTIONS}
            value={sortValue}
            onChange={selectSort}
          />
        </div>
        <span className={styles.count}>
          {count > 0 ? `${count} itens` : ' '}
        </span>
      </div>

      {isError && products.length === 0 ? (
        <div className={styles.state} role="alert">
          <p>Não foi possível carregar os produtos.</p>
        </div>
      ) : isPending ? (
        <div className={styles.grid}>
          {Array.from({ length: ROWS }, (_, i) => (
            <div key={i} className={styles.skeleton} aria-hidden>
              <div className={styles.skeletonMedia} />
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonButton} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
                delay: (index % ROWS) * 0.05,
              }}
            >
              <ProductCard
                title={product.name}
                description={product.description}
                price={formatPrice(product.price)}
                image={{ src: product.image, alt: product.name }}
                currencyIconSrc="/products/eth-icon.png"
                priority={index < 4}
                onBuy={origin => addItem(product, origin)}
                onSelect={() => setSelected(product)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      )}

      {isFetchingNextPage && (
        <div className={styles.loader} aria-label="Carregando mais">
          <span className={styles.spinner} />
        </div>
      )}

      {!hasNextPage && !isPending && products.length > 0 && (
        <p className={styles.end}>Você chegou ao fim da coleção.</p>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
