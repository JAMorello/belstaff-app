import { Button } from "@chakra-ui/react";

const ProductButton = ({ text, control, selected }) => {
  const handleClick = (e) => {
    e.preventDefault();
    control(text);
  };

  return (
    <Button
      size="xs"
      variant={selected ? "solid" : "outline"}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ProductButton;
