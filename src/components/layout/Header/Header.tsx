import Image from 'next/image'
import { CartButton } from '@/components/cart/CartButton'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/logo.svg"
        alt="Starsoft"
        width={101}
        height={38}
        priority
      />

      <CartButton />
    </header>
  )
}
