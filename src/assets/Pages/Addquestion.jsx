import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Box,
  Grid,
  Input,
  Button,
  Textarea,
  Text,
} from "@chakra-ui/react";
import NavBar from "../../Components/NavBar";
import { AuthContext } from "../../Context/AuthContext";
import {
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../FireBase";
import Addcollection from "../../Components/Addcollection";

const Addquestion = () => {
  const { user, coll } = useContext(AuthContext);
  const [collectionList, setCollectionList] = useState([]);
  const [level, setLevel] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [solution, setSolution] = useState("");
  const [notes, setNotes] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const updateCollectionList = async () => {
    const querySnapshot = await getDocs(collection(db, user.email));
    const collectionNames = querySnapshot.docs.map((doc) => doc.id);
    setCollectionList(collectionNames);
  };

  useEffect(() => {
    user?.email && updateCollectionList();
  }, [user.email]);

  useEffect(() => {
    setIsButtonDisabled(
      !(
        collectionName &&
        level &&
        title &&
        url &&
        solution &&
        notes.length >= 5 &&
        isValidUrl(url)
      )
    );
  }, [collectionName, level, title, url, solution, notes]);

  const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = async () => {
    if (user?.email) {
      const userId = doc(db, user.email, collectionName);
      await updateDoc(userId, {
        questions: arrayUnion({
          title: title,
          solution: solution,
          notes: notes,
          level: level,
          url: url,
        }),
      });
      setIsAdded(true);
    } else {
      alert("Login To Bookmark");
    }
  };

  return (
    <Box w="100%">
      <Grid
        w="100%"
        gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}
        gap="2rem"
        p="2rem"
      >
        <Addcollection updateCollectionList={updateCollectionList} />
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="2rem"
          p="2rem"
          boxShadow="lg"
          borderRadius="lg"
        >
          <Box>
            <FormControl>
              <FormLabel>Level</FormLabel>
              <Select
                textTransform="uppercase"
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Select level..."
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Choose Collection</FormLabel>
              <Select
                textTransform="uppercase"
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Select collection"
              >
                {collectionList.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Question Title</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Question Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Question Link</FormLabel>
              <Input
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Paste Question link"
                isInvalid={url && !isValidUrl(url)}
              />
              {url && !isValidUrl(url) && (
                <Text color="red.500" fontSize="sm">
                  Please enter a valid web link (e.g., http://example.com)
                </Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>Question Solution or Approach</FormLabel>
              <Input
                onChange={(e) => setSolution(e.target.value)}
                type="text"
                placeholder="Solution link or approach"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Any Notes</FormLabel>
              <Textarea
                onChange={(e) => setNotes(e.target.value)}
                type="text"
                placeholder="Notes (minimum 5 letters)"
              />
            </FormControl>

            <Box mt={4}>
              {isButtonDisabled && (
                <Text color="orange.600">* Fill All fields to Submit</Text>
              )}
              <Button
                disabled={isButtonDisabled}
                bg="teal.600"
                w="100%"
                color="white"
                onClick={handleSubmit}
              >
                {isAdded ? "Added" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Addquestion;
