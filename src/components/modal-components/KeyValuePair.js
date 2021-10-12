import { Box, Table, Tbody, Tr, Td, Text } from "@chakra-ui/react";

const KeyValuePair = ({ product }) => {
  return (
    <Box border="1px" borderColor="gray.300">
      <Table variant="striped" size="sm">
        <Tbody>
          {Object.keys(product.keyValuePairs).map((e) => (
            <>
              <Tr>
                <Td>
                  <Text fontWeight="medium">{e}</Text>
                </Td>
                <Td>{product.keyValuePairs[e]}</Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default KeyValuePair;
