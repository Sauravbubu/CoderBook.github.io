import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { baseurl } from "../constant";

export function ResultDrawer({ text }) {
  const { setsearchdata, searchdata, apiData } = useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [loadingState, setloadingState] = useState(false);
  function handleclick() {
    const arr = [];
    setloadingState(true);
    apiData?.map((e, i) =>
      e.questions.map((el) => {
        if (el.Problem.toLowerCase().includes(text.toLowerCase())) {
          arr.push(el);
        }
      })
    );
    setsearchdata(arr);

    setTimeout(() => {
      setloadingState(false);
    }, 0);

    onOpen();
  }

  // useEffect(() => {
  //   axios
  //     .get(`${baseurl}questions`)
  //     .then((res) => {
  //       const arr = res.apiData;
  //       setdata(arr);
  //     });
  // }, []);
  return (
    <>
      {apiData && apiData.length && (
        <>
          {" "}
          <Button
            ref={btnRef}
            colorScheme="teal"
            size={["xs", "sm", "md"]}
            onClick={handleclick}
            isLoading={loadingState}
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
                {searchdata && searchdata[0]
                  ? "Search Results"
                  : "Try something different"}
              </DrawerHeader>

              <DrawerBody>
                {searchdata && searchdata[0] ? (
                  <>
                    {searchdata?.map((el, i) => (
                      <Qcard
                        key={i}
                        problem={el.Problem}
                        URL={el.URL}
                        Done={el.Done}
                      />
                    ))}{" "}
                  </>
                ) : (
                  <Text
                    mt="6rem"
                    textAlign={"center"}
                    color="red.300"
                    m="3rem"
                    fontSize={"5xl"}
                  >
                    ☹ <br />
                    No Match Write correct keyword
                  </Text>
                )}
              </DrawerBody>

              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
