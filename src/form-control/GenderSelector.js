import {
  HStack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const GenderSelector = ({ gender, setGender }) => {
  const onChange = (e) => {
    setGender(e);
  };

  return (
    <FormControl id="gender">
      <FormLabel>Gender</FormLabel>
      <RadioGroup defaultValue={gender} onChange={onChange}>
        <HStack spacing="24px">
          <Radio value="Men">Men</Radio>
          <Radio value="Women">Women</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default GenderSelector;
