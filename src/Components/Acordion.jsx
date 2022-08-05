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
    <Accordion  allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton  _expanded={{ bg: 'pink.300', color: 'white' }}>
          <Box flex='1'textAlign='left'>
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