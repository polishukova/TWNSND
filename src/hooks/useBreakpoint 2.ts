import { throttle } from 'lodash'
import { useEffect, useState } from 'react'

export const useBreakpoint = (widthSize: number) => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(window.innerWidth < widthSize)

  useEffect(() => {
    const handleResize = throttle(() => {
      const belowBreakpoint = window.innerWidth < widthSize
      if (belowBreakpoint !== isBelowBreakpoint) {
        setIsBelowBreakpoint(belowBreakpoint)
      }
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isBelowBreakpoint])

  return isBelowBreakpoint
}
