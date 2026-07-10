'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { ArrowLeftIcon } from '@/components/ui/icons/ArrowLeftIcon'
import { MinusIcon } from '@/components/ui/icons/MinusIcon'
import { PlusIcon } from '@/components/ui/icons/PlusIcon'
import { TrashIcon } from '@/components/ui/icons/TrashIcon'
import { formatPrice } from '@/lib/api/products'
import { useCart } from '@/lib/cart/useCart'
import styles from './CartDrawer.module.scss'

export function CartDrawer() {
  const { items, total, isOpen, close, removeItem, increment, decrement } =
    useCart()

  // Lock body scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  const formattedTotal = total.toLocaleString('en-US', {
    maximumFractionDigits: 4,
  })

  return (
    <div
      className={clsx(styles.overlay, isOpen && styles.open)}
      // `inert` removes the closed drawer from the tab order and a11y tree.
      inert={!isOpen}
    >
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Fechar carrinho"
        onClick={close}
      />

      {/* Custom slide-in drawer; a native <dialog> can't animate this way. */}
      {/* eslint-disable-next-line jsx-a11y/prefer-tag-over-role */}
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Mochila de Compras"
      >
        <header className={styles.header}>
          <button
            className={styles.back}
            type="button"
            aria-label="Fechar carrinho"
            onClick={close}
          >
            <ArrowLeftIcon className={styles.backIcon} />
          </button>
          <h2 className={styles.title}>Mochila de Compras</h2>
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Sua mochila está vazia.</p>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {items.map(({ product, quantity }) => (
                <li key={product.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <Image
                      className={styles.itemImageInner}
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="139px"
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <div className={styles.itemHead}>
                      <p className={styles.itemName}>{product.name}</p>
                      <p className={styles.itemDesc}>{product.description}</p>
                    </div>

                    <p className={styles.itemPrice}>
                      <Image
                        className={styles.ethIcon}
                        src="/products/eth-icon.png"
                        alt=""
                        width={29}
                        height={29}
                      />
                      <span>{formatPrice(product.price)} ETH</span>
                    </p>

                    <div className={styles.itemControls}>
                      <div className={styles.quantity}>
                        <button
                          className={styles.qtyButton}
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() => decrement(product.id)}
                          disabled={quantity <= 1}
                        >
                          <MinusIcon />
                        </button>
                        <span className={styles.qtyValue}>{quantity}</span>
                        <button
                          className={styles.qtyButton}
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() => increment(product.id)}
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        className={styles.delete}
                        type="button"
                        aria-label={`Remover ${product.name}`}
                        onClick={() => removeItem(product.id)}
                      >
                        <TrashIcon className={styles.deleteIcon} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>
                  <Image
                    className={styles.totalIcon}
                    src="/products/eth-icon.png"
                    alt=""
                    width={34}
                    height={34}
                  />
                  {formattedTotal} ETH
                </span>
              </div>

              <button className={styles.finish} type="button">
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
