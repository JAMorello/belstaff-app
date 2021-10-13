import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CategorySelector = ({ data, setCategory }) => {
  const init = !!data ? data[0] : "";
  const [selectedValue, setSelectedValue] = useState(init);

  useEffect(() => {
    setCategory(selectedValue);
  }, [selectedValue, setCategory]);

  return (
    <FormControl id="category" isRequired={true} ml={1}>
      <FormLabel>Category</FormLabel>
      {!data ? (
        <Select
          size="sm"
          isDisabled={true}
          placeholder="Select option"
          aria-required={true}
        />
      ) : (
        <Select
          size="sm"
          placeholder="Select option"
          aria-required={true}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {data.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </Select>
      )}
    </FormControl>
  );
};

export default CategorySelector;
