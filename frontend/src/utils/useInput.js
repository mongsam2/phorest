import { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

export default useInput;

//사용법
// const maxLen = (value) => value.length <= 10;
// const name = useInput("Mr.", maxLen);
// <input placeholder="Name" {...name} />
// 즉, useInput('초기값: string', '검증로직:string -> bool')