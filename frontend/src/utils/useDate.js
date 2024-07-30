import { useState, useEffect } from "react";

const useDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}. ${month}. ${day}`;
    };

    const date = new Date();
    setCurrentDate(formatDate(date));
  }, []);

  return currentDate;
};

export default useDate;
