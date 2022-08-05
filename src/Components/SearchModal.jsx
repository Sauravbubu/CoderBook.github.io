import React, { useContext } from "react";
import { SearchContext } from "../Context/SeachContex";

import { Button, Text, useDisclosure } from "@chakra-ui/react";

// const {setsearchdata,searchdata} = useContext(SearchContext)

// {searchdata.map((el,i)=><Qcard problem={el.Problem} URL={el.URL} Done={el.Done}/>)}
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Qcard from "./Qcard";
import { data } from "../data";

export function ResultDrawer({ text }) {
  const { setsearchdata, searchdata } = useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  function handleclick() {
    const arr = [];

    data.map((e, i) =>
      e.questions.map((el) => {
        if (el.Problem.includes(text)) {
          arr.push(el);
        }
      })
    );
    setsearchdata(arr);

    onOpen();
  }
  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        size={["sm", "sm", "md"]}
        onClick={handleclick}
      >
        Search
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"md"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>
            {" "}
            {searchdata !== [] ? "Search Results" : "Try something different"}
          </DrawerHeader>

          <DrawerBody>
            {searchdata !== [] ? (
              <>
                {searchdata.map((el, i) => (
                  <Qcard
                    key={i}
                    problem={el.Problem}
                    URL={el.URL}
                    Done={el.Done}
                  />
                ))}{" "}
              </>
            ) : (
              
              <Text mt="6rem" textAlign={"center"} color="red.300" m="3rem" fontSize={"5xl"}>
              ☹ <br/>No Match
                
                Write correct keyword 
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
