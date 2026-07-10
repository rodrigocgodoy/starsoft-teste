/* eslint-disable react/display-name -- dynamic proxy stub for tests */
import React from 'react'

// Lightweight stub for `motion/react` so tests render markup without animation
// (and without pulling the ESM animation runtime).
const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'layoutId',
  'layout',
  'whileHover',
  'whileTap',
  'whileInView',
  'drag',
  'onAnimationComplete',
  'onAnimationStart',
])

function strip(props: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if (!MOTION_PROPS.has(key)) out[key] = props[key]
  }
  return out
}

export const motion: Record<string, React.ElementType> = new Proxy(
  {},
  {
    get: (_target, tag: string) =>
      React.forwardRef<unknown, Record<string, unknown>>(
        ({ children, ...props }, ref) =>
          React.createElement(tag, { ref, ...strip(props) }, children),
      ),
  },
) as Record<string, React.ElementType>

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export function useAnimate() {
  const scope = React.useRef(null)
  return [scope, () => Promise.resolve()] as const
}
