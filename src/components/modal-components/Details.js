import { Box, Table, Tbody, Tr, Td, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Details = ({ product }) => {
  return (
    <Box border="1px" borderColor="gray.300">
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
              <Text fontWeight="medium">Section</Text>
            </Td>
            <Td>{product.section}</Td>
          </Tr>
          <Tr>
            <Td>
              <Text fontWeight="medium">Category</Text>
            </Td>
            <Td>
              <Link href={product.category_url} isExternal>
                {product.category}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Td>
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
    </Box>
  );
};

export default Details;
