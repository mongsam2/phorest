const useNotification = (title, options) => {
    if (!("Notification" in window)){
        return;
    }
    const fireNotif = () => {
        if(Notification.permission !== "granted"){
            Notification.requestPermission().then(permission => {
                if (permission === "granted"){
                    new Notification(title, options);
                }else{
                    return;
                }
            })
        }else {
            new Notification(title, options)
        }
    };
    return fireNotif;
}
export default useNotification;
// 알림 띄우는 훅
// 사용법
// import useNotification from "./useNotification";
// const App = () => {
//   const triggerNotif = useNotification("Welcome to my website!", {
//     body: "Take a look plz",
//   });
//   return (
//     <div>
//       <button onClick={triggerNotif}>Notify Btn</button>
//     </div>
//   );
// };

// export default App;
