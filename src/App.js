import { ChakraProvider } from "@chakra-ui/react";
import ProductSelector from "./ProductSelector";

const App = () => {
  return (
    <ChakraProvider>
      <ProductSelector />
    </ChakraProvider>
  );
};

export default App;
