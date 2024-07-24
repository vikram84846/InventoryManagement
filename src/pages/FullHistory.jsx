import React, { useState, useContext, Suspense } from 'react';
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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    HStack,
    VStack,
    useBreakpointValue,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ProductContext } from '../context/ProductContext';
import Loading from '../components/Loading';
const Sidebar = React.lazy(() => import('../components/Sidebar'));

function FullHistory() {
    const { category, history, wareHouse } = useContext(ProductContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWareHouse, setSelectedWareHouse] = useState('');

    const handleCategorySelect = (catName) => {
        setSelectedCategory(catName);
    };

    const handleWareHouseSelect = (warehouseName) => {
        setSelectedWareHouse(warehouseName);
    };

    const filteredHistory = history.filter((entry) => {
        const matchesCategory = !selectedCategory || (entry.products && entry.products.category && entry.products.category.name === selectedCategory);
        const matchesWarehouse = !selectedWareHouse || (entry.products && entry.products.location && entry.products.location.some(loc => loc.name === selectedWareHouse));
        return matchesCategory && matchesWarehouse;
    });

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
                    minH="100vh"
                >
                    <HStack
                        flexDirection={{ base: "column", md: "row" }} // Stack vertically on mobile
                        justify="space-between"
                        mb={6}
                    >
                        <Center w="full">
                            <Heading size={isMobileView ? "md" : "lg"}>Full History</Heading>
                        </Center>
                        <HStack spacing={4} mb={isMobileView ? 4 : 0}>
                            <Menu>
                                <MenuButton mr={2} fontWeight={'bold'}>
                                    {selectedWareHouse ? selectedWareHouse : 'Warehouse'}
                                    <Icon as={ChevronDownIcon} />
                                </MenuButton>
                                <MenuList minWidth="150px">
                                    <MenuItem onClick={() => setSelectedWareHouse('')}>
                                        All Warehouses
                                    </MenuItem>
                                    {wareHouse &&
                                        wareHouse.map((warehouse, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={() => handleWareHouseSelect(warehouse.name)}
                                            >
                                                {warehouse.name}
                                            </MenuItem>
                                        ))}
                                </MenuList>
                            </Menu>
                            {isMobileView && (
                                <Menu>
                                    <MenuButton fontWeight={'bold'}>
                                        {selectedCategory ? selectedCategory : 'CATEGORY'}
                                        <Icon as={ChevronDownIcon} />
                                    </MenuButton>
                                    <MenuList minWidth="150px">
                                        <MenuItem onClick={() => setSelectedCategory('')}>
                                            All Categories
                                        </MenuItem>
                                        {category &&
                                            category.map((cat, index) => (
                                                <MenuItem
                                                    key={index}
                                                    onClick={() => handleCategorySelect(cat.name)}
                                                >
                                                    {cat.name}
                                                </MenuItem>
                                            ))}
                                    </MenuList>
                                </Menu>
                            )}
                        </HStack>
                    </HStack>

                    {isMobileView ? (
                        <VStack spacing={4} w="full">
                            {filteredHistory.map((entry, index) => (
                                <Box key={index} bg="white" p={4} borderRadius="md" boxShadow="md" w="full">
                                    <VStack align="start" spacing={2}>
                                        <Text fontWeight="bold">Product Name: {entry.products && entry.products.title ? entry.products.title : 'unknown'}</Text>
                                        <Text>Category: {entry.products && entry.products.category && entry.products.category.name ? entry.products.category.name : "unknown"}</Text>
                                        <Text color={entry.quantity < 0 ? 'red.500' : 'green'}>Quantity: {entry.quantity}</Text>
                                        <Text>Note: {entry.note}</Text>
                                        <Text>Time: {new Date(entry.$createdAt).toLocaleTimeString([], {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}</Text>
                                        <Text>Date: {new Date(entry.$createdAt).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</Text>
                                    </VStack>
                                </Box>
                            ))}
                        </VStack>
                    ) : (
                        <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                            <TableContainer>
                                <Table variant="striped" colorScheme="purple">
                                    <Thead>
                                        <Tr>
                                            <Th>Product Name</Th>
                                            <Th>
                                                <Menu>
                                                    <MenuButton fontWeight={'bold'}>
                                                        {selectedCategory ? selectedCategory : 'CATEGORY'}
                                                        <Icon as={ChevronDownIcon} />
                                                    </MenuButton>
                                                    <MenuList minWidth="150px">
                                                        <MenuItem onClick={() => setSelectedCategory('')}>
                                                            All Categories
                                                        </MenuItem>
                                                        {category &&
                                                            category.map((cat, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    onClick={() => handleCategorySelect(cat.name)}
                                                                >
                                                                    {cat.name}
                                                                </MenuItem>
                                                            ))}
                                                    </MenuList>
                                                </Menu>
                                            </Th>
                                            <Th>Quantity</Th>
                                            <Th>Note</Th>
                                            <Th>Time</Th>
                                            <Th>Date</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredHistory.map((entry, index) => (
                                            <Tr key={index}>
                                                <Td>{entry.products && entry.products.title ? entry.products.title : 'unknown'}</Td>
                                                <Td>{entry.products && entry.products.category && entry.products.category.name ? entry.products.category.name : "unknown"}</Td>
                                                <Td color={entry.quantity < 0 ? 'red.500' : 'green'}>
                                                    {entry.quantity}
                                                </Td>
                                                <Td>{entry.note}</Td>
                                                <Td>
                                                    {new Date(entry.$createdAt).toLocaleTimeString([], {
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </Td>
                                                <Td>
                                                    {new Date(entry.$createdAt).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </Td>
                                            </Tr>
                                        ))}
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

export default FullHistory;
