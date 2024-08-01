import React, { useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box } from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

function History() {
    const { history } = useContext(ProductContext);

    const historyToShow = history.slice(0, 5);
    const historyCount = historyToShow.length;
    const captionText = historyCount === 5 ? "Last 5 updates" : `Last ${historyCount} update${historyCount === 1 ? '' : 's'}`;

    return (
        <Box mt={8} overflowX="auto"> {/* Make the container scrollable horizontally on small screens */}
            <Table
                variant="striped"
                colorScheme="gray"
                borderRadius={5}
                shadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                size={{ base: 'sm', md: 'md' }} // Adjust font size based on screen size
            >
                <Thead bg="purple.200">
                    <Tr>
                        <Th fontSize={{ base: 'sm', md: 'md' }}>Product Name</Th>
                        <Th fontSize={{ base: 'sm', md: 'md' }}>Category</Th>
                        <Th fontSize={{ base: 'sm', md: 'md' }}>Location</Th>
                        <Th fontSize={{ base: 'sm', md: 'md' }}>Quantity</Th>
                        <Th fontSize={{ base: 'sm', md: 'md' }}>Note</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {historyToShow.map((entry, index) => {
                        const product = entry.products;

                        return (
                            <Tr key={index}>
                                <Td fontSize={{ base: 'sm', md: 'md' }}>
                                    <Link to={`/products/${entry.products?.$id}`}>
                                        {product ? product.title : 'Unknown'}
                                    </Link>
                                </Td>
                                <Td fontSize={{ base: 'sm', md: 'md' }}>
                                    <Link to={`/category/${product.category?.$id}`}>
                                        {product && product.category ? product.category.name : 'Unknown'}
                                    </Link>
                                </Td>
                                <Td fontSize={{ base: 'sm', md: 'md' }}>
                                    {product && product.location && product.location[0] ? product.location[0].name : 'N/A'}
                                </Td>
                                <Td fontSize={{ base: 'sm', md: 'md' }} color={entry.quantity < 0 ? '#F56C6C' : '#41B883'}>
                                    {entry.quantity}
                                </Td>
                                <Td fontSize={{ base: 'sm', md: 'md' }}>{entry.note}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
                <TableCaption fontSize={{ base: 'sm', md: 'md' }}>{captionText}</TableCaption>
            </Table>
        </Box>
    );
}

export default History;
