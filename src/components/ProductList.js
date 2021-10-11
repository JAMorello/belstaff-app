import { useState } from "react";
import { VStack, StackDivider, useDisclosure } from "@chakra-ui/react";
import Product from "./Product";
import NoProductsBadge from "./NoProductsBadge";
import ProductModal from "./ProductModal";
import { nanoid } from "nanoid";

const ProductList = ({ filteredData, noProducts }) => {
  // Initialize varibles for Modal use
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProducts, setCurrentProducts] = useState([]);

  // Fire up when the product modal is going to be opened
  const handleOpenModal = (products) => {
    setCurrentProducts(products);
    onOpen();
  };

  // If there aren't any products to be shown
  if (noProducts) {
    return <NoProductsBadge />;
  }

  return (
    <VStack
      shadow="md"
      w={["100vw", "70vw"]}
      divider={<StackDivider />}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={3}
      m={3}
    >
      {filteredData.map((products) => {
        return (
          <Product
            key={nanoid()}
            products={products}
            handleOpenModal={handleOpenModal}
          />
        );
      })}
      {currentProducts.length !== 0 && (
        <ProductModal
          isOpen={isOpen}
          onClose={onClose}
          currentProducts={currentProducts}
        />
      )}
    </VStack>
  );
};

export default ProductList;
