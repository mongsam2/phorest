import { useEffect, useRef, useState } from "react";

const useFullscreen = (elementRef, onFull) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleFullscreenChange = () => {
    const isFull =
      document.fullscreenElement === elementRef.current ||
      document.webkitFullscreenElement === elementRef.current ||
      document.mozFullScreenElement === elementRef.current ||
      document.msFullscreenElement === elementRef.current;

    setIsFullscreen(isFull);
    if (onFull) {
      onFull(isFull);
    }

    if (isFull) {
      elementRef.current.classList.add("fullscreen-container");
    } else {
      elementRef.current.classList.remove("fullscreen-container");
      elementRef.current.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const triggerFull = async () => {
    if (elementRef.current) {
      try {
        setScrollPosition(elementRef.current.scrollTop);
        if (elementRef.current.requestFullscreen) {
          await elementRef.current.requestFullscreen();
        } else if (elementRef.current.webkitRequestFullscreen) {
          await elementRef.current.webkitRequestFullscreen();
        } else if (elementRef.current.mozRequestFullScreen) {
          await elementRef.current.mozRequestFullScreen();
        } else if (elementRef.current.msRequestFullscreen) {
          await elementRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    }
  };

  const exitFull = async () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      } catch (error) {
        console.error("Failed to exit fullscreen:", error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, triggerFull, exitFull };
};

export default useFullscreen;
