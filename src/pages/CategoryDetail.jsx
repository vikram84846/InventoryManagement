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
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Center,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { HiDotsVertical } from 'react-icons/hi';
// import EditCategory from '../functionality/categoryUpdates/EditCategory';
// import DeleteCategory from '../functionality/categoryUpdates/DeleteCategory';
import SearchBar from '../functionality/SearchBar';
import EditCategory from '../functionality/categoryUpdates/EditCategory';
import DeleteCategory from '../functionality/categoryUpdates/DeleteCategory';

function CategoryDetail() {
    const { categoryId } = useParams(); // Get the categoryId from URL
    const { category: categories, fetchCategories } = useContext(ProductContext);
    const [category, setCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        if (categories) {
            const foundCategory = categories.find(c => c.$id === categoryId);
            setCategory(foundCategory);

            if (foundCategory && foundCategory.products) {
                setCategoryProducts(foundCategory.products);
            }
        }
    }, [categoryId, categories]);

    if (!category) {
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
                        <Heading size={{ base: "md", md: "lg" }}>Category Details</Heading>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<HiDotsVertical color={'black'} />}
                                variant="ghost"
                                aria-label="Options"
                            />
                            <MenuList minWidth="120px" maxWidth="120px">
                                <MenuItem>
                                    Edit<EditCategory category={category} />
                                </MenuItem>
                                <MenuItem>
                                    Delete<DeleteCategory category={category} />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Center>
                <HStack justify="space-between" wrap="wrap" spacing={4}>
                    {[
                        { title: 'Category ID', value: category.$id || 'N/A' },
                        { title: 'Category Name', value: category.name || 'N/A' },
                        { title: 'Number of Products', value: categoryProducts.length },
                        {
                            title: 'CreatedAt', value: category.$createdAt ? (
                                <>
                                    {new Date(category.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}{" "}
                                    {new Date(category.$createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </>
                            ) : 'N/A'
                        }

                    ].map((item, index) => (
                        <Box key={index} w={{ base: "100%", sm: "48%", md: "22%" }}>
                            <Card borderWidth="1px" borderColor={'purple.500'} borderRadius="lg" overflow="hidden" boxShadow="lg">
                                <CardHeader bg="purple.200" p={4}>
                                    <Heading size='sm'>{item.title}</Heading>
                                </CardHeader>
                                <CardBody p={4}>
                                    <Text fontSize='md'>{item.value}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                    ))}
                </HStack>
                {/* Products in this Category */}
                <Heading size={{ base: "lg", md: "xl" }} marginInline={'auto'} color="gray.700" fontWeight="semibold">Products in this Category</Heading>
                <TableContainer overflowX="auto">
                    <Table variant="striped" colorScheme="purple">
                        <Thead bg="purple.200">
                            <Tr>
                                <Th color="purple.700">Product Name</Th>
                                <Th color="purple.700">Description</Th>
                                <Th color="purple.700">Stock</Th>
                                <Th color="purple.700">Price</Th>
                                <Th color="purple.700">CreatedAt</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {categoryProducts.length > 0 ? categoryProducts.map((product, index) => (
                                <Tr key={index} _hover={{ bg: "purple.50" }}>
                                    <Td>
                                        <Link to={`/products/${product?.$id}`}>
                                            {product.title || 'N/A'}
                                        </Link>
                                    </Td>
                                    <Td>{product.discription || 'N/A'}</Td>
                                    <Td>{product.quantity || 'N/A'}</Td>
                                    <Td>${product.price || 'N/A'}</Td>
                                    <Td>
                                        {new Date(product.$createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}{" "}
                                        {new Date(product.$createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </Td>
                                </Tr>
                            )) : (
                                <Tr>
                                    <Td colSpan="4" textAlign="center">No products found</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </Suspense>
    );
}

export default CategoryDetail;
