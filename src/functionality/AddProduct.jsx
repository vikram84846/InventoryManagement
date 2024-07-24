import React, { useContext, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
    useToast // Import useToast hook
} from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import { createProduct } from '../appwrite/Services';

function AddProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { category, fetchProducts, wareHouse } = useContext(ProductContext);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const toast = useToast(); // Initialize useToast hook

    const handleCreateProduct = async () => {
        const product = {
            title: productName,
            discription: productDescription, // Corrected spelling of 'description'
            category: productCategory,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
            location: [productLocation]
        };

        try {
            const response = await createProduct(product);
            // console.log(response);
            fetchProducts();
            onClose(); // Close the modal after successful creation

            // Show success toast notification
            toast({
                title: 'Product Created',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
        } catch (error) {
            console.error('Error creating product:', error);

            // Show error toast notification
            toast({
                title: 'Error',
                description: 'Failed to create product.',
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
                Add Products
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl onSubmit={handleCreateProduct}>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                                placeholder='Enter product name'
                                type='text'
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder='Write a description'
                                type='text'
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                            <FormLabel>Category</FormLabel>
                            <Select
                                placeholder='Select Category'
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                {category.map((cat) => (
                                    <option key={cat.$id} value={cat.$id}>{cat.name}</option>
                                ))}
                            </Select>
                            <FormLabel>Location</FormLabel>
                            <Select
                                placeholder='Select Room'
                                value={productLocation}
                                onChange={(e) => setProductLocation(e.target.value)}
                            >
                                {wareHouse.map((location) => (
                                    <option key={location.$id} value={location.$id}>{location.name}</option>
                                ))}
                            </Select>
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                placeholder='Quantity'
                                type='number'
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                            <FormLabel>Price per piece</FormLabel>
                            <Input
                                placeholder='Price'
                                type='number'
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={handleCreateProduct}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddProduct;
