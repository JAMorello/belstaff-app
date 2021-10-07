import { ChakraProvider, Flex } from "@chakra-ui/react";
import ProductSelector from "./components/ProductSelector";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import allProducts from "./scraper/data/ALLPRODUCTS.json";

const App = () => {
  const [data, setData] = useState(allProducts);
  const [filteredData, setFilteredData] = useState(allProducts);

  return (
    <ChakraProvider>
      <Flex alignItems="center" direction="column">
        <Header />
        <ProductSelector data={data} setFilteredData={setFilteredData} />
        <ProductList filteredData={filteredData} />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
