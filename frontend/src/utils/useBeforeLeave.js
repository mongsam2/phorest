import { useEffect } from "react";

const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    if (typeof onBefore !== "function") {
      return;
    }
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, [onBefore]);
};

export default useBeforeLeave;
// 마우스가 페이지를 벗어날 때 console 띄우기. 원하는 함수로 변형 가능
// 사용법
// const begMessage = () => console.log("plz don't leave");
// useBeforeLeave(begMessage);