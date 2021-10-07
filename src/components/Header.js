import { VStack, Heading, Divider } from "@chakra-ui/react";

const Header = () => {
  return (
    <VStack p={2} w="100%" mb={2}>
      <Heading>Belstaff App</Heading>
      <Divider />
    </VStack>
  );
};

export default Header;
