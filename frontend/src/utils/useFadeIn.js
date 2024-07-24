import { useEffect, useRef } from "react";

const useFadeIn = (duration = 3, delay = 0) => {
  const element = useRef(null);
  useEffect(() => {
    if (typeof duration !== "number" || typeof delay !== "number") {
      return;
    }
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, [duration, delay]);

  return { ref: element, style: { opacity: 0 } };
};

export default useFadeIn;

// 화면에 천천히 나타나게 하는 효과
// 사용법
// import useFadeIn from "./useFadeIn";
// const App = () => {
//   const fadeInH1 = useFadeIn(2, 5);
//   const fadeInP = useFadeIn(5);
//   return (
//     <div className="App">
//       <h1 {...fadeInH1}>Hello</h1>
//       <p {...fadeInP}>Ipsum Lorem dopem sia nom</p>
//     </div>
//   );
// };

// export default App;
