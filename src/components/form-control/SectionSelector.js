import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const SectionSelector = ({ data, setSection, setCategory }) => {
  const sections = Object.keys(data);

  const [selectedValue, setSelectedValue] = useState(sections[0]);

  useEffect(() => {
    setSection(selectedValue);
    setCategory(null);
  }, [selectedValue, setSection, setCategory]);

  return (
    <FormControl id="section" isRequired={true} mr={1}>
      <FormLabel>Section</FormLabel>
      <Select
        placeholder="Select option"
        aria-required={true}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        {sections.map((section) => {
          return (
            <option key={section} value={section}>
              {section}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SectionSelector;
