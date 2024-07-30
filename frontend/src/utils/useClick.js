import { useEffect, useRef } from "react";

const useClick = (onClick) => {
  const element = useRef(null);

  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, [onClick]);

  return element;
};

export default useClick;
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
