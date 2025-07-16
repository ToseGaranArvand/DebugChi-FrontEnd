import { useEffect, useState } from "react";

export const GetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0); // مقدار اولیه امن

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // مقداردهی اولیه
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};
