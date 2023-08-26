import axios from "axios";
import React, {
  createContext,
  useContext,
  startTransition,
  useEffect,
  useState,
} from "react";
import { baseurl } from "../constant";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [searchdata, setsearchdata] = useState([]);

  useEffect(() => {
    // Wrap the axios call with startTransition
    startTransition(() => {
      !apiData.length &&
        axios.get(`${baseurl}questions`).then((res) => {
          const arr = res.data;
          setApiData(arr);
        });
    });
  }, []);

  return (
    <SearchContext.Provider value={{ searchdata, setsearchdata, apiData }}>
      {children}
    </SearchContext.Provider>
  );
}
