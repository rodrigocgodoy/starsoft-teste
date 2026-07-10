import Link from 'next/link'
import clsx from 'clsx'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link href="/" className={clsx(styles.link, styles.left)}>
          Início
        </Link>

        <p className={styles.copyright}>
          Starsoft © Todos os direitos reservados
        </p>

        <Link href="/new" className={clsx(styles.link, styles.right)}>
          Versão aprimorada
        </Link>
      </div>
    </footer>
  )
}
