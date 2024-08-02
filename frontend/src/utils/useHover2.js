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

// 사용법 (여기에 HoverOut 메소드만 추가하면 된다)
// import useClick from "./useClick";
// import useHover from "./useHover";
// function App() {
//   const sayHello = () => console.log("hello");
//   const refName1 = useClick(sayHello);
//   const refName2 = useHover(sayHello);

//   return (
//     <div className="App">
//       <h1 ref={refName1}>Click me!</h1>
//       <h1 ref={refName2}>Hover me!</h1>
//     </div>
//   );
// }

// export default App;