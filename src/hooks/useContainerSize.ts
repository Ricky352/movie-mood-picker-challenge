import { useState, useEffect, useRef } from "react";

export const useContainerSize = (initialSize = 480) => {
  const [containerSize, setContainerSize] = useState(initialSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current)
        setContainerSize(containerRef.current.offsetWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { containerRef, containerSize };
};
