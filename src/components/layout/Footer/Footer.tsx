import Link from 'next/link'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Navegação do rodapé">
          <Link href="/" className={styles.link}>
            Início
          </Link>
          <Link href="/new" className={styles.link}>
            Explorar
          </Link>
        </nav>

        <p className={styles.copyright}>
          Starsoft © Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
