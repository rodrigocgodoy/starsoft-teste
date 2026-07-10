'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronIcon } from '@/components/ui/icons/ChevronIcon'
import styles from './SortSelect.module.scss'

export interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ options, value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find(o => o.value === value) ?? options[0]

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.select} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className={styles.value}>{current.label}</span>
        <ChevronIcon
          className={clsx(styles.chevron, open && styles.chevronOpen)}
        />
      </button>

      <AnimatePresence>
        {open && (
          // Custom animated dropdown; a native <select> can't be styled/animated this way.
          // eslint-disable-next-line jsx-a11y/prefer-tag-over-role
          <motion.ul
            className={styles.menu}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {options.map(option => {
              const active = option.value === value
              return (
                // eslint-disable-next-line jsx-a11y/prefer-tag-over-role
                <li key={option.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={clsx(styles.option, active && styles.active)}
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    {active && <span className={styles.check}>✓</span>}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
