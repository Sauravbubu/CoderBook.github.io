import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { baseurl } from "../constant";

const FrontendPart = ({ type }) => {
  const [javascriptlist, setjavascriptlist] = useState([]);
  function getjs() {
    axios.get(`${baseurl + type}`).then((questions) => {
      setjavascriptlist(questions.data);
    });
  }
  // useMemo(() => getjs(), [count]);
  useEffect(() => {
    getjs();
  }, []);
  console.log(javascriptlist);
  function camelCase(str) {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  }
  const [id, setId] = useState(0);
  return (
    <>
      <Box
        overflow={"auto"}
        position="sticky"
        left={10}
        mt="1rem"
        p="2 "
        top={30}
        // border="1px"
        w="20vw"
        // position="fixed"
        //   position="-webkit-sticky"
        height="100vh"
        bgColor="red.50"
        boxShadow={"2xl"}
        borderRadius={"xl"}
      >
        {javascriptlist?.map((questions, i) => (
          <Box key={i} p="3" fontWeight="bold">
            <Text
              style={{ fontWeight: "bold", fontFamily: "Helvetica" }}
              color={"black"}
              cursor="pointer"
              fontSize={["sm", "xs", "md"]}
              onClick={() => setId(i)}
              borderRadius="xl"
              p="1.5"
              _hover={{
                backgroundColor: "orange.100",
                // color: "teal.500",
              }}
            >
              {i + 1} -{" "}
              {questions.title.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
              })}
            </Text>
          </Box>
        ))}
      </Box>
      <Grid
        width="80%"
        position="absolute"
        top={10}
        right={0}
        display="grid"
        templateColumns="repeat(1, 1fr)"
        height="100%"
        p={"3rem"}
        // border="1px"
        gap="1rem"
      >
        <GridItem
          colSpan={1}
          //   border="1px"
          borderColor={"gray.400"}
          borderRadius={"xl"}
          position={"relative"}
          overflow="auto"
          mt="1rem"
        >
          <Box pl="2rem">
            {javascriptlist.map((questions, i) => {
              if (i == id) {
                return (
                  <Box>
                    <Text
                      style={{ fontWeight: "bold", fontFamily: "Helvetica" }}
                      m="1rem"
                      textAlign="center"
                      fontSize={"3xl"}
                    >
                      {" "}
                      {questions.title.replace(
                        /(\w)(\w*)/g,
                        function (g0, g1, g2) {
                          return g1.toUpperCase() + g2.toLowerCase();
                        }
                      )}
                    </Text>
                    <Box
                      w="95%"
                      display="flex"
                      justifyContent={"center"}
                      boxShadow="2xl"
                      p="1"
                    >
                      <iframe
                        width="100%"
                        height="500"
                        src={questions.link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Box>
                    <Box
                      width="100%"
                      p="2rem"
                      display={"flex"}
                      justifyContent="center"
                    >
                      <a
                        href="https://jsfiddle.net/coderbook/x4q79mvd/"
                        target="_blank"
                        width="100%"
                        height="500"
                        style={{
                          margin: "auto",
                          backgroundColor: "tomato",
                          borderRadius: "10px",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                          color: "white",
                        }}
                      >
                        Solve Now
                      </a>
                    </Box>

                    <Box
                      style={{
                        width: "80%",
                        fontSize: "20px",
                        paddingLeft: "2rem",
                      }}
                    >
                      <Text textAlign="left" fontSize={"3xl"} mt="2">
                        {" "}
                        {questions.answer}
                      </Text>
                    </Box>
                    <Box></Box>
                  </Box>
                );
              }
            })}

            {/* <pre>
              <code>
                {`
      <body>
    <div>
        <h2> Welcome To GFG</h2>
        <div id="grandparent">GrandParent
            <div id="parent">Parent
                <div id="child">Child</div>
            </div>
        </div>
    </div>
</body>
}
`}
              </code>
            </pre> */}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default FrontendPart;
