import { useEffect, useState } from "react";

const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return state;
};

export default useScroll;
// 스크롤에 따른 stylesheet 변화주기
// 사용법
// import useScroll from "./useScroll";
// const App = () => {
//   const { y } = useScroll();
//   return (
//     <div className="App" style={{ height: "10000vh" }}>
//       <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
//         HELLO
//       </h1>
//     </div>
//   );
// };
// export default App;