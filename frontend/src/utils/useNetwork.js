import { useEffect, useState } from "react";

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    // Cleanup function to remove event listeners on unmount
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};

export default useNetwork;
// 네트워크 상황 받아서 return으로 true/false 반환하는 훅
// 사용법
// import useNetwork from "./utils/useNetwork"
// const handleNetworkChange = (online) => {
//     console.log(online ? "We just turned online" : "We just turned offline");
//   };
// const onLine = useNetwork(handleNetworkChange);
// <h1>{onLine ? "Online" : "Offline"}</h1>
