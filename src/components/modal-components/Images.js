import { useState, useEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

const Images = ({ product }) => {
  const [selected, setSelected] = useState(product.images[0]);

  useEffect(() => {
    setSelected(product.images[0]);
  }, [product]);

  return (
    <Box h="60vh" border="1px" borderColor="gray.300">
      <Flex h="full">
        <Box w="20%" p={2}>
          <Flex h="full" direction="column">
            {product.images.map((e) => {
              return (
                <Image
                  src={e}
                  alt={product.title}
                  objectFit="cover"
                  boxSize="50px"
                  border={e === selected ? "2px" : "1px"}
                  borderColor={e === selected ? "black" : "gray"}
                  borderRadius="lg"
                  onClick={() => setSelected(e)}
                  mb={1}
                />
              );
            })}
          </Flex>
        </Box>
        <Flex justifyContent="space-around" alignItems="center" w="80%" p={3}>
          <Image
            src={selected}
            alt={product.title}
            h="95%"
            objectFit="cover"
            borderColor="gray"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Images;
