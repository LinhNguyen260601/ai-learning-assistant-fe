import { useEffect, useState } from 'react'
import isUndefined from 'lodash/isUndefined'

interface ViewportSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

/**
 * Custom hook to detect viewport size and device type
 * @param breakpoint - The breakpoint in pixels to determine mobile (default: 1024)
 * @returns Viewport size information and device type flags
 */
export const useViewport = (breakpoint: number = 1024): ViewportSize => {
  const [viewport, setViewport] = useState<ViewportSize>(() => {
    if (isUndefined(window)) {
      return {
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }
    }

    const width = window.innerWidth
    const height = window.innerHeight

    return {
      width,
      height,
      isMobile: width < breakpoint,
      isTablet: width >= breakpoint && width < 1280,
      isDesktop: width >= 1280,
    }
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setViewport({
        width,
        height,
        isMobile: width < breakpoint,
        isTablet: width >= breakpoint && width < 1280,
        isDesktop: width >= 1280,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return viewport
}

/**
 * Simplified hook that only returns mobile detection
 * @param breakpoint - The breakpoint in pixels to determine mobile (default: 1024)
 * @returns Boolean indicating if the viewport is mobile
 */
export const useIsMobile = (breakpoint: number = 1024): boolean => {
  const isMobile = useViewport(breakpoint).isMobile
  return isMobile
}
