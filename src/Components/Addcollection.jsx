import { Button, Flex, FormLabel, Input } from '@chakra-ui/react'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../FireBase'
import {Link} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
const Addcollection = () => {
    const {setcoll,coll,settopic} =useContext(AuthContext)
    const [collectionadd, setcollectionadd] = useState("");
    const [collectionList, setcollectionList] = useState([]);
    const addCollection=()=>{
        // console.log(collectionadd)
        setDoc(doc(db,"collection",collectionadd),{
            questions:[],
           
        })
        setcoll(!coll)

        }

        useEffect(() => {
          const arr=[]
           async function getDocss(){
             const querySnapshot = await getDocs(collection(db, "collection"));
         querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
           console.log(doc.id, " => ", doc.data());
           arr.push(doc.id)
         
         });
         setcollectionList(arr)
           }
           getDocss()
           
         }, [coll]);
         console.log(collectionList)
  return (
    <Flex  gap="1rem" w="20vw" flexDir={"column"}>
    <FormLabel textAlign={"center"} >Add a collection Name</FormLabel>
          <Input onChange={(e)=>setcollectionadd(e.target.value)} type="text" placeholder="Enter a Collection Name"></Input>
          <Button bg="blue.200" onClick={addCollection}>Add</Button>

        

          {collectionList?.map((el,i)=><Link  key={i} to="/ownstore">
          <Button size={["sm", "sm", "md"]} textTransform="uppercase" w="100%" bg="orange.200" onClick={()=>{settopic(el)}}>{el}</Button> </Link>)}
          
        </Flex>
  )
}

export default Addcollection