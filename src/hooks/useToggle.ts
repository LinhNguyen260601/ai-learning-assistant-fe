import { useState } from 'react'

/**
 * Custom hook to toggle a value
 * @param initialValue - The initial value of the toggle
 * @returns An object with the value, open, close, and toggle functions
 */
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)

  const open = () => setValue(true)
  const close = () => setValue(false)
  const toggle = () => setValue((prev) => !prev)

  return { value, open, close, toggle }
}
