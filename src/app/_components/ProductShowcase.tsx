'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import styles from './ProductShowcase.module.scss'

interface DemoProduct {
  id: string
  title: string
  description: string
  price: number
}

const products: DemoProduct[] = [
  {
    id: 'star-wand',
    title: 'Lorem Ipsum',
    description: 'Redesigned from scratch and completely revised.',
    price: 32,
  },
  {
    id: 'star-wand-2',
    title: 'Magic Staff',
    description: 'Handcrafted artifact with a one-of-a-kind aura.',
    price: 18,
  },
  {
    id: 'star-wand-3',
    title: 'Crystal Scepter',
    description: 'Limited edition — only a handful will ever exist.',
    price: 47,
  },
]

export function ProductShowcase() {
  const [buyingId, setBuyingId] = useState<string | null>(null)

  function handleBuy(id: string) {
    setBuyingId(id)
    setTimeout(() => setBuyingId(null), 1200)
  }

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button</h2>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className={styles.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className={styles.row}>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
          <Button variant="outline" leftIcon={<span>←</span>}>
            With icon
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Product card</h2>
        <div className={styles.grid}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={{ src: '/products/star-wand.png', alt: product.title }}
              currencyIconSrc="/products/eth-icon.png"
              isBuying={buyingId === product.id}
              onBuy={() => handleBuy(product.id)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
