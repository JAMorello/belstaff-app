import { Box, Table, Tbody, Tr, Td } from "@chakra-ui/react";

const Bullets = ({ product }) => {
  return (
    <Box border="1px" borderColor="gray.300">
      <Table variant="striped" size="sm">
        <Tbody>
          {product.bullets.map((e) => (
            <Tr>
              <Td>{e}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Bullets;
