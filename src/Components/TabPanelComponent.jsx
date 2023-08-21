import { Flex, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Qcard from './Qcard'

const TabPanelComponent = ({ id, questions, topicName }) => {

  return (
    <TabPanel key={id}>
      <Flex
        direction="column"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        maxW="800px" // Set maximum width for larger screens
        mx="auto" // Center horizontally
        p={[4, 6, 8]} // Responsive padding
      >
        {questions.map((qn, i) => (
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
  )
}

export default TabPanelComponent;
