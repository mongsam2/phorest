import { useRef, useEffect } from "react";
const useHover = (onHover) => {
  const element = useRef(null);
  useEffect(() => {
    if (typeof onHover !== "function") {
      return;
    }
    const node = element.current;
    if (node) {
      node.addEventListener("mouseenter", onHover);
    }
    return () => {
      if (node) {
        node.removeEventListener("mouseenter", onHover);
      }
    };
  }, [onHover]);
  return element;
};

export default useHover;
// 사용법
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
