import defaultAxios from "axios";
import { useEffect, useState } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const [trigger, setTrigger] = useState(0);

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    if (!opts.url) return;

    axiosInstance(opts)
      .then((response) => {
        setState({
          ...state,
          loading: false,
          data: response.data,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          data: null,
          error,
        });
      });
  }, [trigger]);

  return { ...state, refetch };
};

export default useAxios;
// URL로부터 data를 받아오는 훅. loading 기능과 fetch, error 등을 처리할 수 있다.
// 사용법
// import useAxios from "./useAxios";
// const App = () => {
//   const { loading, data, refetch } = useAxios({
//     url: "https://yts.mx/api/v2/list_movies.json",
//   });
//   console.log(`Loading: ${loading}\nData:${JSON.stringify(data)}`);
//   return (
//     <div>
//       <h1>{data && data.status}</h1>
//       <h2>{loading && "Loading"}</h2>
//       <button onClick={refetch}>Refetch Button</button>
//     </div>
//   );
// };

// export default App;
