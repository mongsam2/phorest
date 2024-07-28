import { useState } from "react";

const useInput = (initialValue, validator, maxLength) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;

    if (maxLength && value.length > maxLength) {
      willUpdate = false;
      setError(`최대 ${maxLength} 글자까지입니다`);
    } else {
      setError("");
    }

    if (typeof validator === "function" && willUpdate) {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  return { value, onChange, onKeyDown, error };
};

export default useInput;
