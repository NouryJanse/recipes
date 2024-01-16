import { useEffect, useState } from "preact/hooks";

export const useScreenDetector = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isTablet = width > 768 && width < 1014;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
