import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(() => {})
  let id: number

  if (callback === undefined) return

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      id = window.setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])

  return { clear: () => clearInterval(id) }
}
