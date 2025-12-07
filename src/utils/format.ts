/**
 * Format a date to a string
 * @param date - The date to format
 * @param locales - The locales to use
 * @param options - The options to use
 * @returns The formatted date
 */
export const formatDate = (
  date: Date | null,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!date || isNaN(date.getTime())) return 'Invalid Date'

  return date.toLocaleString(
    locales || 'en-GB',
    options || {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  )
}
