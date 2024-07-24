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
// 특정 element(예를들어 한 div블록)을 전체화면으로 만들어주는 훅
// 사용법
// import React from "react";
// import useFullscreen from "./useFullscreen";

// const FullscreenComponent = () => {
//   const { element, isFullscreen, triggerFull, exitFull } = useFullscreen();

//   return (
//     <div>
//       <div ref={element} style={{ width: "300px", height: "200px", background: "lightblue" }}>
//         <p>이 요소를 풀스크린으로 전환합니다.</p>
//         {isFullscreen ? (
//           <button onClick={exitFull}>풀스크린 종료</button>
//         ) : (
//           <button onClick={triggerFull}>풀스크린 시작</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FullscreenComponent;
