import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

/**
 * Merge class names and return a string of class names
 * @param inputs - Class values to merge
 * @returns A string of class names
 */
export const cn = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
