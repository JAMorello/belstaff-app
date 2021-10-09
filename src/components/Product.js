import { Flex, HStack, Heading, Spacer, Button, Badge } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import { nanoid } from "nanoid";

const Product = ({ products, handleOpenModal }) => {
  const getColors = (products) => {
    const colorSet = new Set(products.map((e) => e.color));
    return [...colorSet].slice(0, 3);
  };

  const getColorsSurplus = (products) => {
    const colorSet = new Set(products.map((e) => e.color));
    return [...colorSet].length - 3;
  };

  const getSizes = (products) => {
    const sizesSet = new Set(products.map((e) => e.size));
    return [...sizesSet].slice(0, 4);
  };

  const getSizesSurplus = (products) => {
    const sizesSet = new Set(products.map((e) => e.size));
    return [...sizesSet].length - 4;
  };

  return (
    <Flex
      key={nanoid()}
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      w="full"
    >
      <HStack w={{ base: "100%", md: "30%" }}>
        <CheckCircleIcon color="green.500" />
        <Heading size="sm" fontWeight={500}>
          {products[0].title}
        </Heading>
      </HStack>
      <Spacer />
      <Flex
        w={{ base: "100%", md: "50%" }}
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Flex
          direction="row"
          flexWrap="wrap"
          // justifyContent="space-evenly"
          // alignItems="center"
        >
          {getColors(products).map((e) => (
            <Badge p={1} m={1}>
              {e}
            </Badge>
          ))}
          {getColorsSurplus(products) > 0 ? (
            <Badge colorScheme="teal" p={1} m={1}>
              + {getColorsSurplus(products)}
            </Badge>
          ) : null}
        </Flex>
        <Spacer />
        <Flex
          direction="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {getSizes(products).map((e) => (
            <Badge p={1} m={1}>
              {e}
            </Badge>
          ))}{" "}
          {getSizesSurplus(products) > 0 ? (
            <Badge colorScheme="teal" p={1} m={1}>
              + {getSizesSurplus(products)}
            </Badge>
          ) : null}
        </Flex>
      </Flex>
      <Spacer />
      <Flex w="20%" direction="row-reverse">
        <Button onClick={() => console.log(products)}>Click!</Button>
      </Flex>
      {/* <Button colorScheme="green" onClick={() => handleOpenModal(product)}>View</Button> */}
    </Flex>
  );
};

export default Product;
