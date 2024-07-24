import { Box, HStack, Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import SearchBar from '../functionality/SearchBar';
import ShowRooms from './ShowRooms';

function Header() {
  return (
    <Box
      p={[0, 4]}
      ml={[0, '250px']}
      w={['100%', 'calc(100% - 250px)']}
      maxW="100vw"
      boxSizing="border-box"
    >
      <Flex
        direction={['column', 'row']}
        align="center"
        h="100%"
        p={[4, 0]}
        position="relative"
        // overflow="hidden"
        justify={['flex-end', 'center']}
      >
        <Box
          w={['100%', 'auto']}
          mb={[4, 0]}
          display="flex"

          justifyContent={['flex-end', 'center']}
          flexGrow={1}
        >
          <SearchBar />
        </Box>
        <HStack
          spacing={6}
          mr={[0, 10]}
          alignItems="center"
          mb={[4, 0]}
        >
          <ShowRooms />
        </HStack>
      </Flex>
      <Divider
        w="80%"
        borderWidth="2px"
        marginInline="auto"
        mt={4} 
      />
    </Box>
  );
}

export default Header;
