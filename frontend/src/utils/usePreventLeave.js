const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

export default usePreventLeave;
// 창 닫기 전 저장하지 않고 닫으면 날아간다고 경고해주는 창 띄워주는 훅
//사용법
// const { enablePrevent, disablePrevent } = usePreventLeave();
// <button onClick={enablePrevent}>Protect</button>
// <button onClick={disablePrevent}>Unprotect</button>
