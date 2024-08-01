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
import { db } from '../appwrite/appwriteService';

function AddProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { category, fetchProducts, wareHouse, user } = useContext(ProductContext);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const toast = useToast(); // Initialize useToast hook

    const handleCreateProduct = async (e) => {
        e.preventDefault(); // Correctly prevent the default form submission
        if (!productName || !productDescription || !productCategory || !productPrice || !productQuantity || !productLocation) {
            toast({
                title: 'Error',
                description: 'All fields are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
            return; // Exit the function if validation fails
        }

        const product = {
            title: productName,
            discription: productDescription, // Corrected spelling of 'description'
            category: productCategory,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity),
            location: [productLocation],
            userId: user.$id
        };
        try {
            const response = await db.products.create(product);
            fetchProducts();
            onClose(); // Close the modal after successful creation
            setProductName('');
            setProductDescription('');
            setProductCategory('');
            setProductPrice('');
            setProductQuantity('');
            setProductLocation('');

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
                Add Product
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleCreateProduct}>
                            <FormControl mb={4}>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                    placeholder='Enter product name'
                                    type='text'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    placeholder='Write a description'
                                    type='text'
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={4}>
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
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Location</FormLabel>
                                <Select
                                    placeholder='Select Location'
                                    value={productLocation}
                                    onChange={(e) => setProductLocation(e.target.value)}
                                >
                                    {wareHouse.map((location) => (
                                        <option key={location.$id} value={location.$id}>{location.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                    placeholder='Quantity'
                                    type='number'
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Price per piece</FormLabel>
                                <Input
                                    placeholder='Price'
                                    type='number'
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </FormControl>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button type='submit' variant='ghost'>
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddProduct;
