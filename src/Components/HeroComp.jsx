import React from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Illustration } from "./illustration";
import CommonButton from "./Molecules/Button";
import { TextConstants } from "../constant";

export default function CallToActionWithIllustration() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Coding Interviews{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          CoderBook.in is an Onestop question bank for your coding and DSA
          interviews. I am a frontend Developer and currently focusing on
          frontend. Feel Free to Contribute Your Questions from your domain at{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "orange.400",
              fontFamily: "Helvetica",
            }}
          >
            workmailsaurav@gmail.com
          </span>
        </Text>
        <Stack
          spacing={6}
          w="100%"
          justifyContent="center"
          direction={{ base: "column", md: "row" }} // Stack direction changes with screen size
        >
          {TextConstants?.homePageFrontendAllButtonsText?.map((items, i) => (
            <CommonButton
              key={i}
              buttonText={items.title}
              linkTo={items.link}
            />
          ))}
        </Stack>
        <Stack
          spacing={6}
          w="100%"
          justifyContent="center"
          direction={{ base: "column", md: "row" }} // Stack direction changes with screen size
        >
          {TextConstants?.homePageBackendAllButtonsText?.map((items, i) => (
            <CommonButton
              key={i}
              buttonText={items.title}
              linkTo={items.link}
            />
          ))}
        </Stack>
        <Flex w={"full"}>
          <Illustration
            height={{ base: "20rem", sm: "24rem", lg: "28rem" }} // Adjust illustration height for responsiveness
            mt={{ base: 8, sm: 16 }} // Adjust margin top for responsiveness
          />
        </Flex>
      </Stack>
    </Container>
  );
}
