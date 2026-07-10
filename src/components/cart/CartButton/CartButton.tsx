'use client'

import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import { BagIcon } from '@/components/ui/icons/BagIcon'
import { useCart } from '@/lib/cart/useCart'
import styles from './CartButton.module.scss'

export function CartButton() {
  const { count, open } = useCart()
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  const prevCount = useRef(count)

  // Bump the icon whenever the number of units grows.
  useEffect(() => {
    if (count > prevCount.current && scope.current) {
      animate(
        scope.current,
        { scale: [1, 1.35, 1] },
        { duration: 0.35, ease: 'easeOut' },
      )
    }
    prevCount.current = count
  }, [count, animate, scope])

  return (
    <button
      className={styles.cart}
      type="button"
      aria-label={`Carrinho de compras, ${count} ${count === 1 ? 'item' : 'itens'}`}
      onClick={open}
    >
      <span className={styles.iconWrap} ref={scope} data-cart-fly-target>
        <BagIcon className={styles.cartIcon} />
      </span>
      <span className={styles.cartCount}>{count}</span>
    </button>
  )
}
