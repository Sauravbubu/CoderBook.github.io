import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import NavBar from "../../Components/NavBar";
import { AuthContext } from "../../Context/AuthContext";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../FireBase";
import { Firestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import Addcollection from "../../Components/Addcollection";
const Addquestion = () => {
  const { user, coll } = useContext(AuthContext);
  const [collectionadd, setcollectionadd] = useState("");
  const [level, setlevel] = useState("");
  const [collectionn, setcollection] = useState("");
  const [title, settitle] = useState("");
  const [url, seturl] = useState("");
  const [solution, setsolution] = useState("");
  const [Notes, setNotes] = useState("");
  const [collectionList, setcollectionList] = useState([]);

  useEffect(() => {
    const arr = [];
    async function getDocss() {
      const querySnapshot = await getDocs(collection(db, "collection"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        arr.push(doc.id);
      });
      setcollectionList(arr);
    }
    getDocss();
    // console.log(coll)
  }, [coll]);
  // console.log(collectionList)

  // setDoc(doc(db,"user",currentUser.email),{
  //     bookmarked:[],
  //     completed:[],
  //     ownquestions:[],
  // })

  const handleSubmit = async () => {
    console.log(collectionn);
    const userId = doc(db, "collection", `${collectionn}`);
    console.log(level, collectionadd, collectionn, url, title, solution, Notes);

    if (user?.email) {
      // setbookmark(!bookmark);
      await updateDoc(userId, {
        questions: arrayUnion({
          title: title,
          solution: solution,
          notes: Notes,
          level: level,
          url: url,
        }),
      });
    } else {
      alert("Login To Bookmark");
    }
  };

  return (
    <Box w="100%">
      <NavBar />
      <Grid w="100%" gridTemplateColumns="repeat(2, 1fr)" p="2rem">
        <Addcollection />
        <Grid
          w="70vw"
          gap="2rem"
          p="2rem"
          templateColumns="repeat(2, 1fr)"
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"

          }
          borderRadius="lg"
          display={"grid"}
          margin={"auto"}
        >
          <GridItem>
            <FormControl>
              <FormLabel> Level</FormLabel>
              <Select textTransform="uppercase" 
                onChange={(e) => setlevel(e.target.value)}
                placeholder="Select level..."
              >
                <option>easy</option>
                <option>midium</option>
                <option>hard</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel> Collection</FormLabel>
              <Select textTransform="uppercase" 
                onChange={(e) => setcollection(e.target.value)}
                placeholder="Select collection"
              >
                {collectionList?.map((el, i) => (
                  <option  key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Question Title</FormLabel>
              <Input
                onChange={(e) => settitle(e.target.value)}
                type="text"
                placeholder="Enter Question Title"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Question Link</FormLabel>
              <Input
                onChange={(e) => seturl(e.target.value)}
                type="text"
                placeholder="Paste Question link"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Question Soltion or approach for refence</FormLabel>
              <Input
                onChange={(e) => setsolution(e.target.value)}
                type="text"
                placeholder="Enter any youtube/geeksforgeeks or stackoverflow link"
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Any notes</FormLabel>
              <Textarea
                onChange={(e) => setNotes(e.target.value)}
                type=""
                placeholder="Any Notes want to add ( optional )"
              />
            </FormControl>
          </GridItem>
          <Button bg="teal.600" w="30%" color="white" onClick={handleSubmit}>Submit</Button>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Addquestion;
