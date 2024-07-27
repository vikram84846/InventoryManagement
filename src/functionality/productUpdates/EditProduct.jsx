import React, { useState, useContext } from 'react';
import { updateProduct } from '../../appwrite/Services';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
    useBreakpointValue,
    Box,
    VStack,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { ProductContext } from '../../context/ProductContext';

function EditProduct({ product }) {
    const { category, fetchProducts } = useContext(ProductContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [productName, setProductName] = useState(product?.title || '');
    const [productDescription, setProductDescription] = useState(product?.discription || '');
    const [productCategory, setProductCategory] = useState(product?.category?.$id || '');
    const [productPrice, setProductPrice] = useState(product?.price || '');

    const toast = useToast();

    const productDetail = {
        title: productName,
        discription: productDescription,
        category: productCategory,
        price: parseFloat(productPrice),
    };

    const handleSubmit = async () => {
        try {
            await updateProduct(product?.$id, productDetail);
            fetchProducts();
            toast({
                title: 'Success',
                description: 'Your product has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
            toast({
                title: 'Error',
                description: 'Failed to update product details.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };
    

    // Responsive size for modal
    const modalSize = useBreakpointValue({ base: 'md', md: 'md' });

    return (
        <>
            <IconButton
                icon={<MdEdit />}
                onClick={onOpen}
                color={'green.500'}
                aria-label="Edit Product"
                variant={'ghost'}
            />

            <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
                <ModalOverlay />
                <ModalContent mx={{ base: '4', md: 'auto' }} my={{ base: '10', md: 'auto' }}>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                                name="title"
                                value={productName}
                                placeholder="Enter product name"
                                onChange={e => setProductName(e.target.value)}
                            />
                            <FormLabel mt={4}>Category</FormLabel>
                            <Select
                                placeholder='Select Category'
                                isRequired
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                bg='white'
                                _focus={{ borderColor: 'blue.500' }}
                                size='md'
                            >
                                {category.map((cat) => (
                                    <option key={cat.$id} value={cat.$id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Select>
                            <FormLabel mt={4}>Description</FormLabel>
                            <Input
                                name="description"
                                value={productDescription}
                                onChange={e => setProductDescription(e.target.value)}
                                placeholder="Enter product description"
                            />
                            <FormLabel mt={4}>Price</FormLabel>
                            <Input
                                name="price"
                                type="number"
                                value={productPrice}
                                onChange={e => setProductPrice(e.target.value)}
                                placeholder="Enter product price"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" ml={3} onClick={handleSubmit}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditProduct;
