import { useEffect, useRef } from 'react'

/* eslint-disable */

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(() => {})
  let id = -1

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = (): void => {
      savedCallback.current()
    }
    if (delay !== null) {
      // eslint-disable-next-line
      id = window.setInterval(tick, delay)
      return (): void => clearInterval(id)
    }
  }, [delay])

  if (callback === undefined) return null

  return { clear: (): void => clearInterval(id) }
}

/* eslint-enable */

export default useInterval
