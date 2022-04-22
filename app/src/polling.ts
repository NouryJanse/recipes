import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(() => {})
  let id: number = -1

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      // eslint-disable-next-line
      id = window.setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])

  if (callback === undefined) return null

  return { clear: () => clearInterval(id) }
}
