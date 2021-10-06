// import allProducts from "./scraper/data/ALLPRODUCTS.json";
import tree from "./scraper/data/tree.json";
import { useState } from "react";
import GenderSelector from "./form-control/GenderSelector";
import SectionSelector from "./form-control/SectionSelector";
import CategorySelector from "./form-control/CategorySelector";
import { Button } from "@chakra-ui/react";

const ProductSelector = () => {
  // const [data, setData] = useState(allProducts);
  // const [filteredData, setFilteredData] = useState(allProducts);
  const [gender, setGender] = useState("Men");
  const [section, setSection] = useState("Collections");
  const [category, setCategory] = useState("Icons");

  return (
    <form>
      <GenderSelector gender={gender} setGender={setGender} />
      <SectionSelector
        data={tree[gender]}
        setSection={setSection}
        setCategory={setCategory}
      />
      <CategorySelector
        data={tree[gender][section]}
        gender={gender}
        setCategory={setCategory}
      />
      <p>{gender}</p>
      <p>{section}</p>
      <p>{category}</p>
      <Button type="submit" colorScheme="teal" width="full" mt={4}>
        Sign In
      </Button>
    </form>
  );
};

export default ProductSelector;
