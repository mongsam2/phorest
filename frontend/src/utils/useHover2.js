import { useRef, useEffect } from "react";

const useHover = (onHover, onHoverOut) => {
  const element = useRef(null);

  useEffect(() => {
    const node = element.current;
    if (node) {
      if (typeof onHover === "function") {
        node.addEventListener("mouseenter", onHover);
      }
      if (typeof onHoverOut === "function") {
        node.addEventListener("mouseleave", onHoverOut);
      }
    }
    return () => {
      if (node) {
        if (typeof onHover === "function") {
          node.removeEventListener("mouseenter", onHover);
        }
        if (typeof onHoverOut === "function") {
          node.removeEventListener("mouseleave", onHoverOut);
        }
      }
    };
  }, [onHover, onHoverOut]);

  return element;
};

export default useHover;
