import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Box,
    List,
    ListItem,
    FormHelperText,
    useToast
} from '@chakra-ui/react';
import { createHistory, updateProduct } from '../appwrite/Services';

function UpdateStock() {
    const { products, fetchProducts, fetchHistory } = useContext(ProductContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [quantityInput, setQuantityInput] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [detailsOfSelectedProduct, setDetailsOfSelectedProduct] = useState(null);
    const [note, setNote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const toast = useToast();

    useEffect(() => {
        if (selectedProduct) {
            const selectedProductDetails = products.find((product) => product.$id === selectedProduct);
            setDetailsOfSelectedProduct(selectedProductDetails);
        } else {
            setDetailsOfSelectedProduct(null);
        }
    }, [selectedProduct, products]);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const filteredSuggestions = products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, products]);

    const handleProductSelect = (productId) => {
        const product = products.find((p) => p.$id === productId);
        setSelectedProduct(productId);
        setSearchTerm(product.title); // Set the searchTerm to the selected product's title
        setQuantityInput('');
        setSuggestions([]);
    };

    const createStockHistory = async () => {
        const value = {
            products: selectedProduct,
            quantity: parseInt(quantityInput),
            note: note,
        };

        try {
            const response = await createHistory(value);
        } catch (error) {
            console.log(error + ' from create history function from service file');
            throw error;
        }
    };

    const handleSubmit = async () => {
        const updatedQuantity = detailsOfSelectedProduct.quantity + parseInt(quantityInput);

        try {
            const response = await updateProduct(selectedProduct, { quantity: updatedQuantity });
            await createStockHistory();
            fetchProducts();
            fetchHistory();
            onClose();
            setSelectedProduct('');
            setQuantityInput('');

            toast({
                title: 'Stock Updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update stock.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
        }
    };

    return (
        <>
            <Button
                p={5}
                onClick={onOpen}
                variant={'ghost'}
                color={'white'}
                fontWeight={'bold'}
                fontSize={'large'}
                _hover={{ bg: 'purple.700' }}
            >
                Update Stock
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Stock</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                                placeholder="Search product..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {suggestions.length > 0 && (
                                <Box
                                    width="100%"
                                    borderRadius="md"
                                    boxShadow="md"
                                    bg="white"
                                    zIndex="dropdown"
                                    mt={1}
                                >
                                    <List maxHeight={'40vh'} overflowY={'scroll'} spacing={1}>
                                        {suggestions.map((product) => (
                                            <ListItem
                                                key={product.$id}
                                                p={2}
                                                _hover={{ bg: 'purple.100', cursor: 'pointer' }}
                                                onClick={() => handleProductSelect(product.$id)}
                                            >
                                                {product.title}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                type="number"
                                value={quantityInput}
                                onChange={(e) => setQuantityInput(e.target.value)}
                            />
                            <FormLabel>Note</FormLabel>
                            <Input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />

                            {detailsOfSelectedProduct && (
                                <FormHelperText>Current Quantity: {detailsOfSelectedProduct.quantity}</FormHelperText>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" ml={3} onClick={handleSubmit}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateStock;
