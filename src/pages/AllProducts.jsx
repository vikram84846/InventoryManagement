import React, { Suspense, useContext, useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Center,
    Flex,
    Box,
    Icon,
    VStack,
    HStack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react';
import { MdAttachMoney, MdCategory } from 'react-icons/md';
import { ProductContext } from '../context/ProductContext';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ShowRooms from '../components/ShowRooms';
import Loading from '../components/Loading';
import EditProduct from '../functionality/productUpdates/EditProduct';
import DeleteProduct from '../functionality/productUpdates/DeleteProduct';
const Sidebar = React.lazy(() => import('../components/Sidebar'));

function AllProducts() {
    const { products = [], category = [] } = useContext(ProductContext); // Provide default empty arrays
    const [selectedCategory, setSelectedCategory] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCategorySelect = (catName) => {
        setSelectedCategory(catName);
        // console.log(filteredProducts);
        onClose(); // Close the menu when a category is selected
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category && product.category.name === selectedCategory)
        : products;

    const isMobileView = useBreakpointValue({ base: true, md: false });

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Sidebar />
                <Flex
                    ml={{ base: 0, md: "250px" }} // Adjust margin-left for mobile
                    flexDirection="column"
                    p={4}
                    bg="gray.100"
                >
                    <Center mb={6} w="full">
                        <Heading size={isMobileView ? "md" : "lg"}>All Products</Heading>
                    </Center>
                    <HStack
                        flexDirection={{ base: "column", md: "row" }} // Stack vertically on mobile
                        justify="space-between"
                        mb={6}
                        w="full"
                    >
                        <HStack spacing={4} mb={isMobileView ? 4 : 0} w="full" justify={isMobileView ? "center" : "flex-end"}>
                            {isMobileView && (
                                <Menu isOpen={isOpen} onClose={onClose}>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon />}
                                        variant="ghost"
                                        size="sm"
                                        onClick={onOpen}
                                    >
                                        {selectedCategory || 'CATEGORY'}
                                    </MenuButton>
                                    <MenuList minWidth="150px">
                                        <MenuItem onClick={() => handleCategorySelect('')}>All Categories</MenuItem>
                                        {category.map((cat, index) => (
                                            <MenuItem key={index} onClick={() => handleCategorySelect(cat.name)}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            )}
                            <ShowRooms />
                        </HStack>
                    </HStack>

                    {isMobileView ? (
                        <VStack spacing={4}>
                            {filteredProducts.length > 0 ? filteredProducts.map((product, index) => (
                                <Box key={index} bg="white" p={4} borderRadius="md" boxShadow="md" w="full">
                                    <VStack align="start" spacing={2}>
                                        <Text fontWeight="bold">{product.title || 'Unknown Title'}</Text>
                                        <Text>{product.description || 'No description available'}</Text>
                                        <HStack spacing={1}>
                                            <Icon as={MdAttachMoney} />
                                            <Text>{product.price || 'N/A'}</Text>
                                        </HStack>
                                        <Text>{product.quantity || '0'} units</Text>
                                        <HStack spacing={1}>
                                            <Icon as={MdCategory} />
                                            <Text>{product.category ? product.category.name : 'Unknown'}</Text>
                                        </HStack>
                                    </VStack>
                                </Box>
                            )) : (
                                <Text>No products found</Text>
                            )}
                        </VStack>
                    ) : (
                        <Box bg="white" p={4} borderRadius="md" boxShadow="md" overflowY="auto">
                            <TableContainer>
                                <Table variant="striped" colorScheme="purple">
                                    <Thead>
                                        <Tr>
                                            <Th>Title</Th>
                                            <Th>Description</Th>
                                            <Th>Price</Th>
                                            <Th>Quantity</Th>
                                            <Th>Created at</Th>
                                            <Th>
                                                <Menu isOpen={isOpen} onClose={onClose}>
                                                    <MenuButton
                                                        as={Button}
                                                        rightIcon={<ChevronDownIcon />}
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={onOpen}
                                                    >
                                                        {selectedCategory || 'CATEGORY'}
                                                    </MenuButton>
                                                    <MenuList minWidth="150px">
                                                        <MenuItem onClick={() => handleCategorySelect('')}>All Categories</MenuItem>
                                                        {category.map((cat, index) => (
                                                            <MenuItem key={index} onClick={() => handleCategorySelect(cat.name)}>
                                                                {cat.name}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </Menu>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredProducts.length > 0 ? filteredProducts.map((product, index) => (
                                            <Tr key={index}>
                                                <Td>{product.title || 'Unknown Title'}</Td>
                                                <Td>{product.discription || 'No description available'}</Td>
                                                <Td>
                                                    <HStack spacing={1}>
                                                        <Icon as={MdAttachMoney} />
                                                        <Text>{product.price || 'N/A'}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>{product.quantity || '0'} units</Td>
                                                <Td>
                                                    {new Date(product.$createdAt || 'unknown').toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </Td>
                                                <Td>
                                                    <HStack spacing={1}>
                                                        <Icon as={MdCategory} />
                                                        <Text>{product.category ? product.category.name : 'Unknown'}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={1}>
                                                        <EditProduct product={product} />
                                                        <DeleteProduct product={product} />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        )) : (
                                            <Tr>
                                                <Td colSpan="5" textAlign="center">No products found</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Flex>
            </Suspense>
        </>
    );
}

export default AllProducts;
