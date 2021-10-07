import {
  HStack,
  Flex,
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
      <Flex>
        <FormLabel>Gender</FormLabel>
        <RadioGroup defaultValue={gender} onChange={onChange}>
          <HStack>
            <Radio value="Men">Men</Radio>
            <Radio value="Women">Women</Radio>
          </HStack>
        </RadioGroup>
      </Flex>
    </FormControl>
  );
};

export default GenderSelector;
