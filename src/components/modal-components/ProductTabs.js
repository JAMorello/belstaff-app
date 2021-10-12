import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Bullets from "./Bullets";
import Details from "./Details";
import Images from "./Images";
import KeyValuePair from "./KeyValuePair";

const ProductTabs = ({ product }) => {
  return (
    <Tabs isFitted size="sm" variant="enclosed-colored">
      <TabList>
        <Tab>
          <Text fontWeight="medium" color="blue.600">
            Details
          </Text>
        </Tab>
        <Tab>
          <Text fontWeight="medium" color="blue.600">
            Bullets
          </Text>
        </Tab>
        {Object.keys(product.keyValuePairs).length === 0 ? (
          <Tab isDisabled>
            <Text fontWeight="medium" color="orange.600">
              Key-Value
            </Text>
          </Tab>
        ) : (
          <Tab>
            <Text fontWeight="medium" color="blue.600">
              Key-Value
            </Text>
          </Tab>
        )}
        <Tab>
          <Text fontWeight="medium" color="blue.600">
            Images
          </Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Details product={product} />
        </TabPanel>
        <TabPanel>
          <Bullets product={product} />
        </TabPanel>
        <TabPanel>
          <KeyValuePair product={product} />
        </TabPanel>
        <TabPanel>
          <Images product={product} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabs;
