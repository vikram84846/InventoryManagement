import { Box, Card, CardBody, CardHeader, Heading, HStack, VStack, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = React.lazy(() => import('../components/Sidebar'));
import SearchBar from '../functionality/SearchBar';
import { ProductContext } from '../context/ProductContext';

function SearchResult() {
    const { history, fetchHistory, products } = useContext(ProductContext);
    const location = useLocation();
    const { query } = location.state || {};

    // Ensure `query` and `query.$id` are defined before filtering `history`
    const productTransactions = query ? history.filter(transaction => transaction.products && transaction.products.$id === query.$id) : [];
    const currentProductDetail = products.find(product => product.$id === query?.$id) || {};

    useEffect(() => {
        fetchHistory();
        // console.log(query);
    }, [fetchHistory, query]);

    if (!query) {
        return (
            <Box ml={{ base: 0, md: '250px' }} p={4}>
                <Text>No product selected.</Text>
            </Box>
        );
    }

    return (
        <>
            <Sidebar />
            <Box ml={{ base: 0, md: '250px' }} p={4}>
                <Box w={{ base: "90%", md: "40%" }} mx="auto">
                    <SearchBar />
                </Box>
                <HStack justifyContent="center" alignItems="baseline" mt={4} mb={4} spacing={2} flexWrap="wrap">
                    <Text fontSize='2xl' color="gray.700" fontWeight="semibold">Search Results for : </Text>
                    <Heading size='2xl' color="purple.700">{query.title || 'Unknown Title'}</Heading>
                </HStack>

                <VStack spacing={6} p={4} align="stretch">
                    <HStack justify={'space-evenly'} wrap="wrap" spacing={4}>
                        <Box w={{ base: "100%", sm: "48%", md: "18%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='md'>Product Name</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Link to={`/products/${query.$id}`}>
                                        <Text fontSize='lg'>{currentProductDetail.title || query.title || 'N/A'}</Text>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box w={{ base: "100%", sm: "48%", md: "18%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='md'>Category</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='lg'>{currentProductDetail.category?.name || query.category?.name || 'N/A'}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box w={{ base: "100%", sm: "48%", md: "18%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='md'>Stock Available</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='lg' color={(productTransactions.length > 0 && productTransactions[0].products.quantity < 100) ? 'red.500' : 'green'}>
                                        {productTransactions.length > 0 ? productTransactions[0].products.quantity : (currentProductDetail.quantity || 'N/A')}
                                    </Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box w={{ base: "100%", sm: "48%", md: "18%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='md'>Price</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='lg'>${query.price || currentProductDetail.price || 'N/A'}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box w={{ base: "100%", sm: "48%", md: "18%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='md'>Created At</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='lg'>
                                        {query.$createdAt
                                            ? `${new Date(query.$createdAt).toLocaleDateString()} At ${new Date(query.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`
                                            : (currentProductDetail.$createdAt
                                                ? `${new Date(currentProductDetail.$createdAt).toLocaleDateString()} At ${new Date(currentProductDetail.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`
                                                : 'N/A')
                                        }
                                    </Text>
                                </CardBody>
                            </Card>
                        </Box>
                    </HStack>

                    {/* History */}
                    <Heading size='xl' textAlign={'center'} marginInline={'auto'} color="gray.700" fontWeight="semibold">Transaction History</Heading>
                    <TableContainer>
                        <Table variant="striped" colorScheme="purple">
                            <Thead bg="purple.200">
                                <Tr>
                                    <Th color="purple.700">Product Name</Th>
                                    <Th color="purple.700">Category</Th>
                                    <Th color="purple.700">Quantity</Th>
                                    <Th color="purple.700">Note</Th>
                                    <Th color="purple.700">Time</Th>
                                    <Th color="purple.700">Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {productTransactions.length > 0 ? productTransactions.map((entry, index) => (
                                    <Tr key={index} _hover={{ bg: "purple.50" }}>
                                        <Td>
                                            <Link to={`/products/${entry.products.$id}`}>
                                                {entry.products.title || 'N/A'}
                                            </Link>
                                        </Td>
                                        <Td>{entry.products.category?.name || 'N/A'}</Td>
                                        <Td color={entry.quantity < 0 ? 'red.500' : 'green.500'}>
                                            {entry.quantity || 'N/A'}
                                        </Td>
                                        <Td>{entry.note || 'N/A'}</Td>
                                        <Td>{entry.$createdAt ? new Date(entry.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : 'N/A'}</Td>
                                        <Td>{entry.$createdAt ? new Date(entry.$createdAt).toLocaleDateString() : 'N/A'}</Td>
                                    </Tr>
                                )) : (
                                    <Tr>
                                        <Td colSpan="6" textAlign="center">No transactions found</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Box>
        </>
    );
}

export default SearchResult;
