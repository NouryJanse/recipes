import { useEffect, useRef, useState } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  let [id, setId] = useState();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return { clear: () => clearInterval(id) };
};
