import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CommonButton = ({
  buttonText,
  linkTo,
  colorScheme = "orange",
  borderRadius = "full",
  paddingLeft = 18,
  paddingRight = 18,
  width = "",
  hoverScale = 1.05,
  ...restProps
}) => {
  const buttonStyles = {
    borderRadius,
    paddingLeft,
    paddingRight,
    width,
    colorScheme,
    className: "animated-button",
    transition: `transform 0.2s`,
    _hover: { transform: `scale(${hoverScale})` },
  };
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(linkTo)} {...buttonStyles} {...restProps}>
      {buttonText}
    </Button>
  );
};

export default CommonButton;
