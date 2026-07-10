'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { CloseIcon } from '@/components/ui/icons/CloseIcon'
import { formatPrice, type Product } from '@/lib/api/products'
import { useCart } from '@/lib/cart/CartContext'
import styles from './ProductModal.module.scss'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const mediaRef = useRef<HTMLDivElement>(null)

  // Lock body scroll and close on Escape while the modal is open.
  useEffect(() => {
    if (!product) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  function handleBuy(item: Product) {
    addItem(item, mediaRef.current?.getBoundingClientRect())
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Animated modal; a native <dialog> can't run these transitions. */}
          {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={styles.close}
              type="button"
              aria-label="Fechar"
              onClick={onClose}
            >
              <CloseIcon />
            </button>

            <div className={styles.media}>
              <div ref={mediaRef} className={styles.mediaInner}>
                <Image
                  className={styles.image}
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 360px"
                />
              </div>
            </div>

            <div className={styles.body}>
              <h2 className={styles.title}>{product.name}</h2>

              <p className={styles.price}>
                <Image
                  className={styles.priceIcon}
                  src="/products/eth-icon.png"
                  alt=""
                  width={29}
                  height={29}
                />
                <span>{formatPrice(product.price)} ETH</span>
              </p>

              <p className={styles.description}>{product.description}</p>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className={styles.buyButton}
                onClick={() => handleBuy(product)}
              >
                COMPRAR
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
