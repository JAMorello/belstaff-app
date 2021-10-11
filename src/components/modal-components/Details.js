import { Table, Tbody, Tr, Td, Text } from "@chakra-ui/react";

const Details = ({ product }) => {
  return (
    <Table variant="striped" size="sm">
      <Tbody>
        <Tr>
          <Td>
            <Text fontWeight="medium">Breadcrumbs</Text>
          </Td>
          <Td>{product.breadcrumbs.join(" > ")}</Td>
        </Tr>

        <Tr>
          <Td>
            <Text fontWeight="medium">Description</Text>
          </Td>
          <Td>{product.description}</Td>
        </Tr>
        <Tr>
          <Td>
            <Text fontWeight="medium">Brand</Text>
          </Td>
          <Td>{product.brand}</Td>
        </Tr>
        {product.subBrand !== "" ? (
          <Tr>
            <Td>
              <Text fontWeight="medium">Sub-brand</Text>
            </Td>
            <Td>{product.subBrand}</Td>
          </Tr>
        ) : null}
        <Tr>
          <Td>
            <Text fontWeight="medium">Currency</Text>
          </Td>
          <Td>{product.currency}</Td>
        </Tr>
        <Tr>
          <Td>
            <Text fontWeight="medium">Price</Text>
          </Td>
          <Td>{product.price}</Td>
        </Tr>
        <Tr>
          <Td>
            <Text fontWeight="medium">Availability</Text>
          </Td>
          <Td>{product.availability ? "YES" : "NO"}</Td>
        </Tr>
        <Tr>
          <Td>
            <Text fontWeight="medium">Item Group ID</Text>
          </Td>
          <Td>{product.itemGroupId}</Td>
        </Tr>
        <Tr>
          <Td>
            <Text fontWeight="medium">Product SKU</Text>
          </Td>
          <Td>{product.sku}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default Details;
