import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Flex,
  Text,
  ButtonGroup,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import ProductButton from "./ProductButton";

const Selectors = ({
  currentProducts,
  setSelectedProduct,
  color,
  setColor,
  size,
  setSize,
}) => {
  const [isLargerThan380] = useMediaQuery("(min-width: 380px)");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    const newProduct = currentProducts.filter(
      (e) => e.color === color && e.size === size
    );
    setSelectedCategory(newProduct[0].sku);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, size]);

  const colorButtons = getColors(currentProducts).map((e) => (
    <ProductButton
      text={e}
      color="green"
      control={setColor}
      selected={e === color}
    />
  ));

  const sizeButtons = getSizes(currentProducts).map((e) => (
    <ProductButton
      text={e}
      color="teal"
      control={setSize}
      selected={e === size}
    />
  ));

  return (
    <Box>
      <HStack>
        <Text>Colors: </Text>
        {isLargerThan380 ? (
          <ButtonGroup isAttached>{colorButtons}</ButtonGroup>
        ) : (
          <Flex wrap="wrap">{colorButtons}</Flex>
        )}
      </HStack>
      <HStack mt={2}>
        <Text>Sizes: </Text>
        {isLargerThan380 ? (
          <ButtonGroup isAttached>{sizeButtons}</ButtonGroup>
        ) : (
          <Flex wrap="wrap">{sizeButtons}</Flex>
        )}
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
