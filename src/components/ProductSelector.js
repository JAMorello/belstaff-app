import { Button, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GenderSelector from "./form-control/GenderSelector";
import SectionSelector from "./form-control/SectionSelector";
import CategorySelector from "./form-control/CategorySelector";
import tree from "../scraper/data/tree.json";

const ProductSelector = ({ data, setFilteredData }) => {
  const [gender, setGender] = useState("Men");
  const [section, setSection] = useState("Collections");
  const [category, setCategory] = useState("Icons");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = data.filter(
      (e) =>
        e[0].gender === gender &&
        e[0].section === section &&
        e[0].category === category
    );
    setFilteredData(filteredData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack
        w={{ base: "90vw", sm: "80vw", md: "60vw", lg: "50vw", xl: "40vw" }}
      >
        <GenderSelector gender={gender} setGender={setGender} />
        <HStack w="full">
          <SectionSelector
            w="full"
            data={tree[gender]}
            setSection={setSection}
            setCategory={setCategory}
          />
          <CategorySelector
            w="full"
            data={tree[gender][section]}
            gender={gender}
            setCategory={setCategory}
          />
        </HStack>
        <Button type="submit" colorScheme="teal" w="50%">
          Show Product
        </Button>
      </VStack>
    </form>
  );
};

export default ProductSelector;
