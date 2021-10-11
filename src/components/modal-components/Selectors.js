import { useState, useEffect } from "react";
import { Box, HStack, Text, ButtonGroup, Select } from "@chakra-ui/react";
import ProductButton from "./ProductButton";

const Selectors = ({
  currentProducts,
  setSelectedProduct,
  color,
  setColor,
  size,
  setSize,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    currentProducts[0].sku
  );

  const getColors = (products) => {
    const colorSet = new Set(products.map((e) => e.color));
    return [...colorSet];
  };

  const getSizes = (products) => {
    const sizesSet = new Set(products.map((e) => e.size));
    return [...sizesSet];
  };

  useEffect(() => {
    const newProduct = currentProducts.filter(
      (e) => e.sku === selectedCategory
    );
    setSelectedProduct(...newProduct);
    setColor(newProduct[0].color);
    setSize(newProduct[0].size);
  }, [selectedCategory]);

  useEffect(() => {
    const newProduct = currentProducts.filter(
      (e) => e.color === color && e.size === size
    );
    setSelectedCategory(newProduct[0].sku);
  }, [color, size]);

  return (
    <Box>
      <HStack>
        <Text>Colors: </Text>
        <ButtonGroup colorScheme="green" isAttached>
          {getColors(currentProducts).map((e) => (
            <ProductButton text={e} control={setColor} selected={e === color} />
          ))}
        </ButtonGroup>
      </HStack>
      <HStack mt={2}>
        <Text>Sizes: </Text>
        <ButtonGroup colorScheme="teal" isAttached>
          {getSizes(currentProducts).map((e) => (
            <ProductButton text={e} control={setSize} selected={e === size} />
          ))}
        </ButtonGroup>
      </HStack>
      <HStack mt={2}>
        <Text>Variants: </Text>
        <Select
          size="sm"
          placeholder="Select option"
          aria-required={true}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {currentProducts.map((product) => {
            return (
              <option key={product.sku} value={product.sku}>
                {product.sku}
              </option>
            );
          })}
        </Select>
      </HStack>
    </Box>
  );
};

export default Selectors;
