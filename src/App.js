import { useState } from "react";
import { ChakraProvider, Flex, useMediaQuery } from "@chakra-ui/react";
import ProductSelector from "./components/ProductSelector";
import Header from "./components/Header";
import ListHeader from "./components/ListHeader";
import ProductList from "./components/ProductList";
import allProducts from "./scraper/data/ALLPRODUCTS.json";

const App = () => {
  const [filteredData, setFilteredData] = useState(allProducts);
  const [noProducts, setNoProducts] = useState(true);
  const [isLargerThan380] = useMediaQuery("(min-width: 380px)");

  return (
    <ChakraProvider>
      <Flex alignItems="center" direction="column">
        <Header />
        <ProductSelector
          data={allProducts}
          setFilteredData={setFilteredData}
          setNoProducts={setNoProducts}
        />
        {isLargerThan380 ? <ListHeader /> : null}
        <ProductList filteredData={filteredData} noProducts={noProducts} />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
