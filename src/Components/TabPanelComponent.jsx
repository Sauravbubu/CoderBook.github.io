import { Flex, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Qcard from './Qcard'

const TabPanelComponent = ({id,questions,topicName}) => {

    
  return (

    <TabPanel key={id}>
<Flex
  direction="column"
  width={["400px", "600px", "800px", "1300px"]}
  alignItems="center"
  justifyContent="space-between"
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

export default TabPanelComponent