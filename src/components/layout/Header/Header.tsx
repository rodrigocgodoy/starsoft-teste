import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from '@/components/cart/CartButton'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="Starsoft — início">
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Starsoft"
          width={101}
          height={38}
          priority
        />
      </Link>

      <CartButton />
    </header>
  )
}
