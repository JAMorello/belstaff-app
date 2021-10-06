import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CategorySelector = ({ data, setCategory }) => {
  const init = !!data ? data[0] : "";
  const [selectedValue, setSelectedValue] = useState(init);

  useEffect(() => {
    setCategory(selectedValue);
  }, [selectedValue, setCategory]);

  return (
    <FormControl id="category" isRequired={true}>
      <FormLabel>Category</FormLabel>
      {!data ? (
        <Select
          isDisabled={true}
          placeholder="Select option"
          aria-required={true}
        />
      ) : (
        <Select
          placeholder="Select option"
          aria-required={true}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {data.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </Select>
      )}
    </FormControl>
  );
};

export default CategorySelector;
