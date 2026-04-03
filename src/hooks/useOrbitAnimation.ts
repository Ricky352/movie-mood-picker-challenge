import { useState, useEffect, useRef } from "react";

export const useOrbitAnimation = (speed = 0.0003) => {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current != null)
        setOrbitAngle((prev) => prev + speed * (time - lastTimeRef.current!));
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  return orbitAngle;
};
