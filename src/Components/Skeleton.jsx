import { Box, Flex, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

const Skeletonn = () => {
  return (
    <>
    <Skeleton w="100%" mb="2rem">
  <div>contents wrapped</div>
  <div>won't be visible</div>
</Skeleton>
    <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
  <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
  <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
  <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
  <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>
  <Box padding='10' w="80%" m="auto" boxShadow='lg' bg='white'>
  
  <SkeletonText mt='4' noOfLines={4} spacing='4' />
</Box>

  
</>
  )
}

export default Skeletonn