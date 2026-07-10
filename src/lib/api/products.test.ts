import { formatPrice } from './products'

describe('formatPrice', () => {
  it('trims trailing zeros from the API decimal string', () => {
    expect(formatPrice('182.00000000')).toBe('182')
    expect(formatPrice('12.50000000')).toBe('12.5')
  })

  it('keeps up to four fraction digits', () => {
    expect(formatPrice('0.12345000')).toBe('0.1235')
  })

  it('returns the input unchanged when it is not a number', () => {
    expect(formatPrice('not-a-number')).toBe('not-a-number')
  })
})
