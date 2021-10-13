import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  HStack,
  Box,
  Heading,
  Text,
  Badge,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ProductTabs from "./modal-components/ProductTabs";
import Selectors from "./modal-components/Selectors";

const ProductModal = ({ currentProducts, isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(currentProducts[0]);
  const [color, setColor] = useState(currentProducts[0].color);
  const [size, setSize] = useState(currentProducts[0].size);

  useEffect(() => {
    const newProduct = currentProducts.filter(
      (e) => e.color === color && e.size === size
    );
    setSelectedProduct(...newProduct);
  }, [color, size]);

  useEffect(() => {
    setSelectedProduct(currentProducts[0]);
    setColor(currentProducts[0].color);
    setSize(currentProducts[0].size);
  }, [currentProducts]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody p={7}>
          <Flex direction="column">
            <Box mb={5} mt={3}>
              <Flex justifyContent="space-between">
                <Heading as="u" size={["sm", "md"]} fontWeight={500} w="40%">
                  {selectedProduct.title}
                </Heading>
                <HStack>
                  <Badge variant="outline" colorScheme="gray">
                    {selectedProduct.currency}
                  </Badge>
                  <Text fontSize="sm">{selectedProduct.price}</Text>
                </HStack>
              </Flex>
              <HStack mt={1}>
                <Text>{selectedProduct.subTitle}</Text>
                <Badge colorScheme="orange" ml={3}>
                  {selectedProduct.gender}
                </Badge>
              </HStack>
            </Box>
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "flex-end" }}
              mb={6}
            >
              <Selectors
                currentProducts={currentProducts}
                setSelectedProduct={setSelectedProduct}
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
              />
              <Box mt={["8px", "0px"]} alignSelf={["center", "flex-end"]}>
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  size="sm"
                  colorScheme="orange"
                >
                  <Link href={selectedProduct.url} isExternal>
                    See Product
                  </Link>
                </Button>
              </Box>
            </Flex>
            <ProductTabs product={selectedProduct} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
