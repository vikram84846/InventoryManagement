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
import { useNavigate } from 'react-router-dom';


function DeleteCategory({ category }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { fetchCategories } = useContext(ProductContext)
    const toast = useToast();

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const response = await db.categories.delete(category?.$id);
            fetchCategories()
            navigate('/')
            toast({
                title: 'Category Deleted',
                description: `${category.name} has been deleted successfully.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete category.',
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
                    <ModalHeader>Delete Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete <b>{category?.name || 'this categroy'}</b>? This action cannot be undone.
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

export default DeleteCategory;
