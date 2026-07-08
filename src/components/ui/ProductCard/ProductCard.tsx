import type { ComponentProps } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'
import styles from './ProductCard.module.scss'

export interface ProductCardProps extends Omit<
  ComponentProps<'article'>,
  'title'
> {
  /** Product name. */
  title: string
  /** Short supporting copy. */
  description: string
  /** Amount shown next to the currency. */
  price: number | string
  /** Currency label. @default 'ETH' */
  currency?: string
  /** Product image. `blurDataURL` enables a blur-up placeholder. */
  image: { src: string; alt: string; blurDataURL?: string }
  /** Optional currency badge (e.g. the ETH coin). */
  currencyIconSrc?: string
  /** CTA label. @default 'COMPRAR' */
  buyLabel?: string
  /** Fired when the CTA is pressed. */
  onBuy?: () => void
  /** Shows a spinner on the CTA and blocks it. */
  isBuying?: boolean
}

export function ProductCard({
  title,
  description,
  price,
  currency = 'ETH',
  image,
  currencyIconSrc,
  buyLabel = 'COMPRAR',
  onBuy,
  isBuying = false,
  className,
  ...props
}: ProductCardProps) {
  return (
    <article className={clsx(styles.card, className)} {...props}>
      <div className={styles.media}>
        <div className={styles.mediaInner}>
          <Image
            className={styles.image}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 600px) 100vw, 296px"
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL}
          />
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <p className={styles.price}>
            {currencyIconSrc && (
              <Image
                className={styles.priceIcon}
                src={currencyIconSrc}
                alt=""
                width={29}
                height={29}
              />
            )}
            <span className={styles.priceAmount}>
              {price} {currency}
            </span>
          </p>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onBuy}
            isLoading={isBuying}
          >
            {buyLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
