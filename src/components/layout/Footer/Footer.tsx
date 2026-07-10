import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          Starsoft © Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
