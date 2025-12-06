import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names and return a string of class names
 * @param inputs - Class values to merge
 * @returns A string of class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
