import { useRef, useState, useEffect } from "react";

const useFullscreen = (onFull) => {
  const element = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = () => {
    const isFull =
      document.fullscreenElement === element.current ||
      document.webkitFullscreenElement === element.current ||
      document.mozFullScreenElement === element.current ||
      document.msFullscreenElement === element.current;

    setIsFullscreen(isFull);
    if (onFull) {
      onFull(isFull);
    }

    if (isFull) {
      element.current.classList.add("fullscreen-container");
    } else {
      element.current.classList.remove("fullscreen-container");
    }
  };

  const triggerFull = async () => {
    if (element.current) {
      try {
        if (element.current.requestFullscreen) {
          await element.current.requestFullscreen();
        } else if (element.current.webkitRequestFullscreen) {
          // Safari
          await element.current.webkitRequestFullscreen();
        } else if (element.current.mozRequestFullScreen) {
          // Firefox
          await element.current.mozRequestFullScreen();
        } else if (element.current.msRequestFullscreen) {
          // IE/Edge
          await element.current.msRequestFullscreen();
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
          // Safari
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
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

  return { element, isFullscreen, triggerFull, exitFull };
};

export default useFullscreen;
