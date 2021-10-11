import { Table, Tbody, Tr, Td } from "@chakra-ui/react";

const Bullets = ({ product }) => {
  return (
    <Table variant="striped" size="sm">
      <Tbody>
        {product.bullets.map((e) => (
          <Tr>
            <Td>{e}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Bullets;
