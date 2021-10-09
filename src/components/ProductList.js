import { useState } from "react";
import { VStack, StackDivider, useDisclosure } from "@chakra-ui/react";
import Product from "./Product";
import NoProductsBadge from "./NoProductsBadge";
import ProductModal from "./ProductModal";

const ProductList = ({ filteredData, noProducts }) => {
  // Initialize varibles for Modal use
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState({});

  // Fire up when the product modal is going to be opened
  const handleOpenModal = (product) => {
    setCurrentProduct(product);
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
          <Product products={products} handleOpenModal={handleOpenModal} />
        );
      })}
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        currentProduct={currentProduct}
      />
    </VStack>
  );
};

export default ProductList;
