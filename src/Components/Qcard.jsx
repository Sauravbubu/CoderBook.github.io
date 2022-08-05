import React, { useState, useContext } from "react";
import { AddIcon, ExternalLinkIcon, PlusSquareIcon, StarIcon } from "@chakra-ui/icons";
import { Flex, Button,ButtonGroup, Box, Link, Text, IconButton } from "@chakra-ui/react";
import { db } from "../FireBase";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
// import { async } from '@firebase/util'
const Qcard = ({ problem, URL, Done }) => {
  const [done, setdone] = useState(false);
  const [bookmark, setbookmark] = useState(false);
  const { user } = useContext(AuthContext);

  const userId = doc(db, "user", `${user?.email}`);
  //  console.log(user?.email,"Qcard")
  const handleBookmark = async (problem) => {
    setbookmark(true);
 

    if (user?.email) {
     
      await updateDoc(userId, {
        bookmarked: arrayUnion({ problem: problem, URL: URL }),
        
      });
    } else {
      alert("Login To Bookmark");
    }
    setbookmark(false);
  };
  const handleDone = async () => {
    if (user?.email) {
      
      await updateDoc(userId, {
        completed: arrayUnion({ problem: problem, URL: URL }),
      });
    } else {
      alert("Login To Bookmark");
    }
  };

  //deleteBookmark

  return (
<>


    <Flex
      
      w="90%"
      ml=".5rem"
      mr="1rem"
      border=".5px"
      // borderColor="lightblue"
      mb="1rem"
      p="6"
      rounded="md"
      
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
      justifyContent="space-between"
    >
      <Flex direction="column">
        <Text fontSize={["sm", "md", "xl"]} fontWeight="bold">
          {problem}
        </Text>
        <Box mt="1rem">
          <Link
            bg="purple.500"
            borderRadius="xl"
            color="whitesmoke"
            p="0.31em"
            pr="-30px"
            href={URL}
            isExternal
          >
            Solve Now <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
      </Flex>
      <Flex
        flexDir={"column"}
        align="center"
        justifyContent="center"
        gap="1rem"
      >
        <Button
          size={["sm", "xs", "md"]}
          bg={!done ? "pink.700" : "green.600"}
          onClick={() => handleDone(problem)}
          color="white"
        >
          {done ? "completed" : "Pending"}
        </Button>
        <Flex align="center">
         
          <ButtonGroup size='sm' isAttached variant='outline'>
  <Button isLoading={bookmark}  onClick={() => handleBookmark(problem)}>Save</Button>
  <IconButton onClick={() => handleBookmark(problem)} aria-label='Add to friends' icon={<AddIcon />} />
</ButtonGroup>
        </Flex>
      </Flex>
    </Flex>



    </>
  );
};

export default Qcard;
