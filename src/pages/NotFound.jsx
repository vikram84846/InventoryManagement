import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  textDecoration
} from '@chakra-ui/react';
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // Add responsive padding
      p={{ base: 4, md: 8 }}
    >
      <Flex
        direction="column"
        align="center"
        gap={4}
        // Add responsive width
        w={{ base: 'full', md: 'xl' }}
        mx="auto"
      >
        <Icon as={MdErrorOutline} boxSize={16} color="red.500" />
        <Heading as="h1" size="xl">404 - Not Found</Heading>
        <Text fontSize="lg" textAlign={'center'}>Sorry, the page you are looking for does not exist.</Text>
        <Link to="/" _hover={{ textDecoration: 'none' }} replace:true >
          Go back to the
          <Text as="span" color="blue.500"> home page</Text>
        </Link>
      </Flex>
    </Box>
  );
}

export default NotFound;