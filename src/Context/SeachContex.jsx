import React, { createContext, useContext, useEffect, useState } from "react";


export const  SearchContext=createContext()


export default function SearchContextProvider({children}){
    
    const [searchdata, setsearchdata] = useState([]);

    return <SearchContext.Provider value={{searchdata,setsearchdata}}>{children}</SearchContext.Provider>
}