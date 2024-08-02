// src/utils/useFullscreen.js
import { useEffect, useRef, useState } from "react";

const useFullscreen = (elementRef, onFull) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    }
  };

  const triggerFull = async (scrollToPosition) => {
    if (elementRef.current) {
      try {
        if (elementRef.current.requestFullscreen) {
          await elementRef.current.requestFullscreen();
        } else if (elementRef.current.webkitRequestFullscreen) {
          // Safari
          await elementRef.current.webkitRequestFullscreen();
        } else if (elementRef.current.mozRequestFullScreen) {
          // Firefox
          await elementRef.current.mozRequestFullScreen();
        } else if (elementRef.current.msRequestFullscreen) {
          // IE/Edge
          await elementRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);

        // Scroll to the desired position after entering fullscreen
        if (scrollToPosition !== undefined) {
          elementRef.current.scrollTo({
            top: scrollToPosition,
            left: 0,
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    }
  };

  const exitFull = async (scrollToPosition) => {
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
          // Safari
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          await document.msExitFullscreen();
        }
        // Scroll to the desired position after exiting fullscreen
        if (scrollToPosition !== undefined) {
          elementRef.current.scrollTo({
            top: scrollToPosition,
            left: 0,
            behavior: "smooth",
          });
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
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return { isFullscreen, triggerFull, exitFull };
};

export default useFullscreen;
