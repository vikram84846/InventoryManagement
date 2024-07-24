import React, { useState, useEffect, useContext } from 'react';
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
    FormHelperText,
    useToast,
    Select
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { ProductContext  } from '../../context/ProductContext';

function EditProduct({ product }) {
    const {category,fetchProducts } = useContext(ProductContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [productName, setProductName] = useState(product?.title);
    const [productDescription, setProductDescription] = useState(product?.discription);
    const [productCategory, setProductCategory] = useState(product?.category);
    const [productPrice, setProductPrice] = useState(product?.price);
    const toast = useToast();

    const productdetail = {
        title: productName,
        discription: productDescription, // Corrected spelling of 'description'
        category: productCategory,
        price: parseFloat(productPrice),
    };


    const handleSubmit = async () => {
        try {
            await updateProduct(product?.$id, productdetail);
            console.log(product);
            fetchProducts()
            toast({
                title: productName,
                description: 'Product details have been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update product details.',
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
            <IconButton
                icon={<MdEdit />}
                onClick={onOpen}
                color={'green.500'}
                aria-label="Edit Product"
                variant={'ghost'}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
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

                            <FormLabel>Category</FormLabel>
                            <Select
                                placeholder='Select Category'
                                isRequired 
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                {category.map((cat) => (
                                    <option key={cat.$id} value={cat.$id}>{cat.name}</option>
                                ))}
                            </Select>

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
