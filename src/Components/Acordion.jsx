import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'
const Acordion = ({notes}) => {
  return (
    <Accordion  w={['100px','240px']} allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton  _expanded={{ bg: 'pink.300', color: 'white' }}>
          <Box fontSize={["10px","20px"]} flex='1'textAlign='left'>
           See Notes
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {notes}
      </AccordionPanel>
    </AccordionItem>
  
  </Accordion>
  )
}

export default Acordion