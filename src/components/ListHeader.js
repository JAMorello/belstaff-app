import { Table, Thead, Tr, Th, Flex, Text } from "@chakra-ui/react";

const ListHeader = () => {
  return (
    <Table w="70vw" variant="simple" mt={2}>
      <Thead>
        <Tr>
          <Th>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>Product Name</Text>
              <Text>Colors</Text>
              <Text>Sizes</Text>
              <Text alignSelf="flex-end">Action</Text>
            </Flex>
          </Th>
        </Tr>
      </Thead>
    </Table>
  );
};

export default ListHeader;
