import React, { useContext } from 'react';
import {
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useBreakpointValue,
    useToast
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { ProductContext } from '../../context/ProductContext';
import { db } from '../../appwrite/appwriteService';


function DeleteProduct({ product }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { fetchProducts } = useContext(ProductContext)
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const response = await db.products.delete(product?.$id);
            console.log('this is response', product?.$id);
            console.log(response)
            // console.log('this is response', p);
            fetchProducts()
            toast({
                title: 'Product Deleted',
                description: 'Product has been deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error deleting product:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete product.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
        }
    };
    const modalSize = useBreakpointValue({ base: 'md', md: 'md' });
    return (
        <>
            <IconButton
                icon={<MdDelete />}
                onClick={onOpen}
                color={'red.500'}
                aria-label="Delete Product"
                variant={'ghost'}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mx={{ base: '4', md: 'auto' }} my={{ base: '10', md: 'auto' }}>
                    <ModalHeader>Delete Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete <b>{product?.title || 'this product'}</b>? This action cannot be undone.
                    </ModalBody>


                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteProduct;
