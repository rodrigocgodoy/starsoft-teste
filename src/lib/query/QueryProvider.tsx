'use client'

import { useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Code-split the devtools into their own client-only chunk (dev builds only).
const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then(m => m.ReactQueryDevtools),
  { ssr: false },
)

export function QueryProvider({ children }: { children: ReactNode }) {
  // One client per browser session; created lazily so it is never shared
  // across requests on the server.
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min
            gcTime: 1000 * 60 * 60, // 1 hour
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
