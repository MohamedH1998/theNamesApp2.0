import { useEffect, useState } from "react";





const useGetLocalStorage = () => {
  const [storage, setStorage] = useState([]);

  const hasWindow = typeof window !== "undefined";

  useEffect(() => {
    if (hasWindow) {
      setStorage(JSON.parse(localStorage.getItem("memorized_names")));
    }
  }, [hasWindow]);

  return [storage];

}

export default useGetLocalStorage;

