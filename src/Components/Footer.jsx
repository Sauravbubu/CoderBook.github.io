import React from "react";
import { Flex, Text, HStack } from "@chakra-ui/react";

export const Footer = ({ position = "absolute" }) => {
  return (
    <Flex
      // position={position}
      left={0}
      bottom={0}
      width=" 100%"
      textAlign={"center"}
      justifyContent="center"
      alignItems="center"
      direction="column"
      boxShadow="0 -1px 6px -1px rgba(0, 0, 0, 0.1)"
      padding={4}
    >
      <Flex width="100%" justifyContent="center" wrap="wrap">
        <div width="50%" textAlign="center" color="gray.600" fontSize="sm">
          <p>
            © 2021-2022 coderbook.in- India’s #1 Coding Training & certificate
            provider.
          </p>
        </div>
      </Flex>
    </Flex>
  );
};
