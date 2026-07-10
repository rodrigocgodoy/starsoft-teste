import type { Metadata } from 'next'
import { Explorer } from './_components/Explorer'

export const metadata: Metadata = {
  title: 'Explorar · Starsoft',
  description: 'Explore a coleção com ordenação e paginação.',
}

export default function NewPage() {
  return <Explorer />
}
