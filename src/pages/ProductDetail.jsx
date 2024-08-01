import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    VStack,
    HStack,
    Box,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Table,
    Thead,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Center,
    IconButton
} from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { HiDotsVertical } from 'react-icons/hi';
import EditProduct from '../functionality/productUpdates/EditProduct';
import DeleteProduct from '../functionality/productUpdates/DeleteProduct';
import SearchBar from '../functionality/SearchBar';

function ProductDetail() {
    const { productId } = useParams(); // Get the productId from URL
    const { products, history = [], fetchProducts } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    const [productTransactions, setProductTransactions] = useState([]);

    useEffect(() => {
        const foundProduct = products.find(p => p.$id === productId);
        setProduct(foundProduct);

        // Ensure history is an array and filter only if the productId is valid
        if (history && Array.isArray(history)) {
            const filteredTransactions = history.filter(p => p.products && p.products.$id === productId);
            setProductTransactions(filteredTransactions);
        }
    }, [productId, products, history, fetchProducts]);

    if (!product) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Sidebar />
            <VStack spacing={6} p={4} align="stretch" ml={{ base: "0", md: "250px" }} minH="100vh">
                <Center w="full" mb={4}>
                    <Box w={{ base: "90%", md: "60%" }}>
                        <SearchBar />
                    </Box>
                </Center>
                <Center w={'100%'} mb={4}>
                    <HStack spacing={4} align="center">
                        <Heading size={{ base: "md", md: "lg" }}>Product Details</Heading>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<HiDotsVertical color={'black'} />}
                                variant="ghost"
                                aria-label="Options"
                            />
                            <MenuList minWidth="120px" maxWidth="120px">
                                <MenuItem>
                                    Edit<EditProduct product={product} />
                                </MenuItem>
                                <MenuItem>
                                    Delete<DeleteProduct product={product} />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Center>
                <HStack justify="space-between" wrap="wrap" spacing={4}>
                    {[
                        { title: 'Product ID', value: product.$id || 'N/A' },
                        { title: 'Product Name', value: product.title || 'N/A' },
                        { title: 'Description', value: product.discription || 'N/A' },
                        { title: 'Stock available', value: productTransactions.length > 0 ? productTransactions[0].products.quantity : product.quantity },
                        {
                            title: 'Category', value: product.category ? (
                                <Link to={`/category/${product.category.$id}`}>
                                    {product.category.name}
                                </Link>
                            ) : 'N/A'
                        },
                        { title: 'WareHouse', value: product.location[0]?.name || 'N/A' },
                        { title: 'Price', value: `$${product.price}` || 'N/A' },
                        { title: 'Created At', value: product.$createdAt ? `${new Date(product.$createdAt).toLocaleDateString()} At ${new Date(product.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}` : 'N/A' }
                    ].map((item, index) => (
                        <Box key={index} w={{ base: "100%", sm: "48%", md: "22%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='sm'>{item.title || na}</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='md'>{item.value || 'N/A'}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                    ))}
                </HStack>
                {/* Transaction History */}
                <Heading size={{ base: "lg", md: "xl" }} marginInline={'auto'} color="gray.700" fontWeight="semibold">Transaction History</Heading>
                <TableContainer overflowX="auto">
                    <Table variant="striped" colorScheme="purple">
                        <Thead bg="purple.200">
                            <Tr>
                                <Th color="purple.700">Product Name</Th>
                                <Th color="purple.700">Quantity</Th>
                                <Th color="purple.700">Note</Th>
                                <Th color="purple.700">Time</Th>
                                <Th color="purple.700">Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productTransactions.length > 0 ? productTransactions.map((entry, index) => (
                                <Tr key={index} _hover={{ bg: "purple.50" }}>
                                    <Td>{entry.products.title || 'N/A'}</Td>
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
        </Suspense>
    );
}

export default ProductDetail;
