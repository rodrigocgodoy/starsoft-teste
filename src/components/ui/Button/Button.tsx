import clsx from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentProps<'button'> {
  /** Visual style. @default 'primary' */
  variant?: ButtonVariant
  /** Control height/padding/font-size. @default 'md' */
  size?: ButtonSize
  /** Stretch to fill the container width. */
  fullWidth?: boolean
  /** Show a spinner and block interaction. */
  isLoading?: boolean
  /** Element rendered before the label. */
  leftIcon?: ReactNode
  /** Element rendered after the label. */
  rightIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      data-loading={isLoading || undefined}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {!isLoading && leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {!isLoading && rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  )
}
