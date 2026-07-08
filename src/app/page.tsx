import { ProductShowcase } from './_components/ProductShowcase'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductShowcase />
    </main>
  )
}
