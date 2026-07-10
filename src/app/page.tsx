import { ProductList } from './_components/ProductList'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductList />
    </main>
  )
}
