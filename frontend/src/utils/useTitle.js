import { useState, useEffect } from "react";
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

export default useTitle;
// 사용법 (3초 뒤에 페이지제목 Loading... -> Welcome to My Website로 바뀜)
// import useTitle from "./utils/useTitle";
// const TitleComponent = () => {
//   const setTitle = useTitle("Loading...");
//   useEffect(() => {
//     setTimeout(() => {
//       setTitle("Welcome to My Website");
//     }, 3000);
//   }, [setTitle]);
//   return null;
// };

// export default TitleComponent;

// App.js에서
// <TitleComponent />
