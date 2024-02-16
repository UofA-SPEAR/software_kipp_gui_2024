import { Button } from "@chakra-ui/react";

const CustomButton = ({ text, onClick, colorScheme, variant, icon }) => {
  return (
    <Button
      onClick={onClick}
      leftIcon={icon}
      colorScheme={colorScheme}
      variant={variant}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
