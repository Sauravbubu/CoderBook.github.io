import React, { useEffect, useState } from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
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

import axios from "axios";
import Qcard from "./Qcard";
import Skeletonn from "./Skeleton";
import { baseurl } from "../constant";
const TabPannel = () => {
  const colors = ["pink.100", "teal.100", "blue.100", "purple.100", "#353935"];
  const [data, setdata] = useState([]);
  const [skel, setskel] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = colors[tabIndex];
  useEffect(() => {
    axios
      .get(`${baseurl}questions`)
      .then((res) => {
        const arr = res.data;
        setdata(arr);
        setskel(!skel);
      });
  }, []);

  return (
    <>
      {skel && <Skeletonn />}
      <Flex>
        <Tabs>
          <TabList bg="purple.600" color="white" w="100vw">
            {data?.map((el, i) => (
              <Tab
                gap="-1rem"
                key={i}
                overflow="hidden"
                fontSize={["xs", "xs", "sm"]}
              >
                {el.topic}
              </Tab>
            ))}
          </TabList>

          <TabPanels p="1em">
            {data?.map((el, i) => (
              <TabPanel key={i}>
                <Flex
                  direction="column"
                  width={["400px", "600px", "800px", "1300px"]}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontFamily={"monospace"} fontSize="2xl" color="primary">
                    {" "}
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
      </Flex>
    </>
  );
};

export default TabPannel;
