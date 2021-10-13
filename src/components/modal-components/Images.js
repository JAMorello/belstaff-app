import { useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

const Images = ({ product }) => {
  const [selected, setSelected] = useState(product.images[0]);

  useEffect(() => {
    setSelected(product.images[0]);
  }, [product]);

  return (
    <Box h="60vh" border="1px" borderColor="gray.300">
      <Flex
        h="full"
        direction={{ base: "column-reverse", md: "row" }}
        alignItems="center"
      >
        <Flex
          direction={{ base: "row", md: "column" }}
          justifyContent="space-around"
          w={["100%", "20%"]}
          h={["20%", "100%"]}
          p={2}
        >
          {product.images.map((e) => {
            return (
              <Image
                src={e}
                alt={product.title}
                objectFit="cover"
                boxSize={["35px", "50px"]}
                border={e === selected ? "2px" : "1px"}
                borderColor={e === selected ? "black" : "gray"}
                borderRadius="lg"
                onClick={() => setSelected(e)}
                mb={[0, 1]}
                ml={[1, 0]}
              />
            );
          })}
        </Flex>
        <Flex
          justifyContent="space-around"
          w={["100%", "80%"]}
          h={["80%", "100%"]}
          p={3}
        >
          <Image
            src={selected}
            alt={product.title}
            w={["100%", "75%"]}
            objectFit="cover"
            borderColor="gray"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Images;
