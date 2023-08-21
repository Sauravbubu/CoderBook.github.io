import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../constant";

const FrontendPart = ({ type }) => {
  const [javascriptlist, setJavascriptlist] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    axios.get(`${baseurl + type}`).then((response) => {
      setJavascriptlist(response.data);
    });
  }, [type]);

  function handleItemClick(index) {
    setSelectedId(selectedId === index ? null : index);
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "20vw 1fr" }}
      gap="1rem"
      p="1rem"
      height="100vh"
    >
      <Box
      backgroundColor={'gray.100'}
        overflowY="auto"
        maxH={{ base: "20vh", md: "70vh" }}
        borderRight={{ md: "1px solid gray" }}
      >
        {javascriptlist.map((question, i) => (
          <Box
            key={i}
            color="black"
            p="1.5"
            fontWeight="bold"
            _hover={{ backgroundColor: "orange.100" }}
          >
            <Text
              
              cursor="pointer"
              fontSize="sm"
              onClick={() => handleItemClick(i)}
              borderRadius="xl"
              p="1"
            >
              {i + 1} -{" "}
              {question.title.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
              })}
            </Text>
          </Box>
        ))}
      </Box>
      <GridItem
        colSpan={{ base: 1, md: 1 }}
        borderColor="gray.400"
        borderRadius="xl"
        position="relative"
        overflowY="auto"
        mt="1rem"
        ml={{ base: 0, md: "1rem" }}
      >
        <Box>
          {javascriptlist?.map((question, i) => (
            <Box
              key={i}
              display={selectedId === i ? "block" : "none"}
              opacity={selectedId === i ? 1 : 0}
              transition="opacity 0.3s"
            >
              <Text
                style={{ fontWeight: "bold", fontFamily: "Helvetica" }}
                m="1rem"
                textAlign="center"
                fontSize="xl"
              >
                {question.title.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                  return g1.toUpperCase() + g2.toLowerCase();
                })}
              </Text>
              <Box w="100%" boxShadow="2xl" p="1">
                <iframe
                  width="100%"
                  height="300"
                  src={question.link}
                  title="Embedded YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
              <Box w="100%" p="1rem">
                <a
                  href="https://jsfiddle.net/coderbook/x4q79mvd/"
                  target="_blank"
                  style={{
                    display: "block",
                    backgroundColor: "tomato",
                    borderRadius: "10px",
                    padding: "0.5rem",
                    color: "white",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Solve Now
                </a>
              </Box>
              <Box
                style={{
                  width: "100%",
                  fontSize: "16px",
                  paddingLeft: "1rem",
                }}
              >
                <Text fontSize="md" mt="1">
                  {question.answer}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default FrontendPart;
