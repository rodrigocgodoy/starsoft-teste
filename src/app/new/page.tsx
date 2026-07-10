import type { Metadata } from 'next'
import { Explorer } from './_components/Explorer'

export const metadata: Metadata = {
  title: 'Explorar',
  description: 'Explore a coleção com ordenação e scroll infinito.',
}

export default function NewPage() {
  return <Explorer />
}
