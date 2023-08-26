import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { ResultDrawer } from "./SearchModal";

const SearchInput = () => {
  const [text, settext] = useState("");
  return (
    <>
      <Input
        size={["sm", "xs", "md"]}
        onChange={(e) => {
          settext(e.target.value);
        }}
        placeholder="Search Question"
      />
      <ResultDrawer text={text.toLowerCase()} />
    </>
  );
};

export default SearchInput;
