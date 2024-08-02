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

    const method = opts.method ? opts.method.toLowerCase() : "get";

    const axiosOptions = {
      ...opts,
      method,
    };

    axiosInstance(axiosOptions)
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
