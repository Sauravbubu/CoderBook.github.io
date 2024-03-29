import React, { useEffect, useState, useContext } from "react";
import {
  Tabs,
  TabList,
  Box,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SearchContext } from "../../Context/SeachContex";
import axios from "axios";
import Qcard from "../../Components/Qcard";
import Skeletonn from "../../Components/Skeleton";
import { baseurl } from "../../constant";

const TabPannel = () => {
  const { apiData } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0);

  // useEffect(() => {
  //   axios.get(`${baseurl}questions`).then((res) => {
  //     const arr = res.apiData;
  //     setdata(arr);
  //     setIsLoading(false);
  //   });
  // }, []);
  useEffect(() => {
    apiData && apiData.length && setIsLoading(false);
  }, [apiData]);

  return (
    <>
      {isLoading ? ( // Only render Skeletonn when loading
        <Skeletonn isLoading={isLoading} />
      ) : (
        <Tabs>
          <TabList bg="purple.600" color="white" w="100vw">
            {apiData?.map((el, i) => (
              <Tab key={i} overflow="hidden" fontSize={["xs", "xs", "sm"]}>
                {el.topic}
              </Tab>
            ))}
          </TabList>

          <TabPanels p="1em">
            {apiData?.map((el, i) => (
              <TabPanel key={i}>
                <Flex
                  direction="column"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  p={[2, 4]} // Responsive padding
                >
                  <Text
                    fontFamily="monospace"
                    fontSize={["xl", "2xl"]}
                    color="purple.600" // Use consistent color
                    mb={2} // Add margin bottom for spacing
                  >
                    {el.topic}
                  </Text>
                  {el.questions.map((qn, i) => (
                    <Qcard
                      key={i}
                      problem={qn.Problem}
                      URL={qn.URL}
                      Done={qn.Done}
                      bookmark={qn.Bookmark}
                    />
                  ))}
                </Flex>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default TabPannel;
