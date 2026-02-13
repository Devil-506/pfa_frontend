import { format, formatDistanceToNow } from 'date-fns'

export const formatTime = (isoString: string): string => {
  return format(new Date(isoString), 'HH:mm')
}

export const formatDate = (isoString: string): string => {
  return format(new Date(isoString), 'MMM d, yyyy')
}

export const relativeTime = (isoString: string): string => {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true })
}

export const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals)
}