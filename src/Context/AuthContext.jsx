import React, { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../FireBase";
import { useNavigate  } from "react-router-dom";
import { setDoc,doc, updateDoc} from "firebase/firestore"
import axios from "axios";


export const  AuthContext=createContext()

//DSA
export default function AuthContextProvider({children}){
    const navigate=useNavigate()
    const [coll, setcoll] = useState(false);
    const [topic,settopic] = useState("");
    const [user, setuser] = useState({});
    const [data, setdata] = useState([]);   
    function handleLogin(){
        console.log("authin");
        const provider=new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }
    const Logout =()=>{
signOut(auth)
setuser({})
    }
    
    useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
        setuser(currentUser)
        axios.get("https://mini-db.herokuapp.com/api/users").then((res)=>{
            // console.log(res.data)
            setdata(res.data)
            let flag=false;
            for(let i=0;i<res.data.length;i++){
              
                if(res.data[i].id == currentUser.email){
                    // console.log("res.data[i].id",res.data[i].id);
                    flag=true;
                }
               }
            //    console.log(flag)
               if(flag===false){
                
                setDoc(doc(db,"user",currentUser.email),{
                    bookmarked:[],
                    completed:[],
                    ownquestions:[],
                })
                // console.log(flag);
               }
                    }).catch((error)=>{ console.log(error);});
                    // console.log("Cuser",currentUser.email);
                  
              

        axios.post("https://mini-db.herokuapp.com/api/users",{id:currentUser.email}).then((res)=>{

        }).catch((error)=>{ console.log(error);});
    })

   
        return () => {
            unsubscribe()
        };
    }, []);

    useEffect(() => {
        
    }, [data]);
    // console.log("user",user);
    
    return <AuthContext.Provider value={{user,handleLogin,Logout,setcoll,coll,topic,settopic}}>{children}</AuthContext.Provider>
}
export const UserAuth=()=>{
    return  useContext(AuthContext)
}
