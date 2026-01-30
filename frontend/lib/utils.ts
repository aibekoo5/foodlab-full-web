import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale).format(value)
  } catch (e) {
    return String(value)
  }
}

export function formatPriceT(value: number, locale = 'en-US') {
  return `${formatNumber(value, locale)}₸`
}
