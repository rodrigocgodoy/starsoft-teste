'use client'

import { AnimatePresence, motion } from 'motion/react'
import styles from './CartFlyOverlay.module.scss'

export interface Flight {
  id: number
  image: string
  from: { x: number; y: number; size: number }
  to: { x: number; y: number }
}

interface CartFlyOverlayProps {
  flights: Flight[]
  onDone: (id: number) => void
}

const FINAL_SIZE = 32

export function CartFlyOverlay({ flights, onDone }: CartFlyOverlayProps) {
  return (
    <div className={styles.layer} aria-hidden>
      <AnimatePresence>
        {flights.map(flight => {
          const midX = (flight.from.x + flight.to.x) / 2
          // Arc upward before dropping into the cart, clamped on-screen.
          const peakY = Math.max(16, Math.min(flight.from.y, flight.to.y) - 80)
          const endX = flight.to.x - FINAL_SIZE / 2
          const endY = flight.to.y - FINAL_SIZE / 2

          return (
            <motion.img
              key={flight.id}
              src={flight.image}
              alt=""
              className={styles.item}
              initial={{
                x: flight.from.x,
                y: flight.from.y,
                width: flight.from.size,
                height: flight.from.size,
                opacity: 1,
              }}
              animate={{
                x: [flight.from.x, midX, endX],
                y: [flight.from.y, peakY, endY],
                opacity: [1, 1, 0],
                width: FINAL_SIZE,
                height: FINAL_SIZE,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
                times: [0, 0.55, 1],
              }}
              onAnimationComplete={() => onDone(flight.id)}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
