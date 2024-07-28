const useConfirm = (
  message = "",
  callback = () => {
    console.log("confirmed");
  },
  reject = () => {
    console.log("aborted");
  }
) => {
  if (typeof message !== "string") {
    console.warn("The message should be a string");
    return;
  }
  if (typeof callback !== "function") {
    console.warn("The callback should be a function");
    return;
  }
  if (typeof reject !== "function") {
    console.warn("The reject handler should be a function");
    return;
  }

  const confirmAction = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(message)) {
      callback();
    } else {
      reject();
    }
  };

  return confirmAction;
};

export default useConfirm;
// 사용법
// import useConfirm from "./utils/useConfirm"; // 경로를 실제 경로로 변경하세요

// const App = () => {
//   const confirmDelete = useConfirm(
//     "Are you sure you want to delete this?",
//     () => console.log("Item deleted"),
//     () => console.log("Item deletion canceled")
//   );

//   return (
//     <div className="App">
//       <button onClick={confirmDelete}>Delete Item</button>
//     </div>
//   );
// };

// export default App;
