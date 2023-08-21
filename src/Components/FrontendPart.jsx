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
    <Grid
      templateColumns={{ base: "1fr", md: "20vw 1fr" }}
      gap="1rem"
      p="1rem"
      height="100vh"
    >
      <Box
        backgroundColor="gray.100"
        overflowY="auto"
        maxH={{ base: "20vh", md: "100vh" }}
        borderRight={{ md: "1px solid gray" }}
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
        colSpan={{ base: 1, md: 1 }}
        borderColor="gray.400"
        borderRadius="xl"
        position="relative"
        overflowY="auto"
        mt="1rem"
        ml={{ base: 0, md: "1rem" }}
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
                      fontSize="xl"
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
    </Grid>
  );
};

export default FrontendPart;
