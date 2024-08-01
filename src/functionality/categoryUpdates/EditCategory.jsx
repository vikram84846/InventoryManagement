import React, { useState, useContext } from 'react';
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
import { db } from '../../appwrite/appwriteService';

function EditCategory({ category }) {
    const { fetchCategories } = useContext(ProductContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [categoryName, setcategoryName] = useState(category?.name || '');

    const toast = useToast();

    const categoryDetail = {
        name: categoryName,
    };

    const handleSubmit = async () => {
        try {
            await db.categories.update(category?.$id, categoryDetail);
            fetchCategories();
            toast({
                title: 'Success',
                description: 'Your Category has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } catch (error) {
            console.error('Error updating Category:', error);
            toast({
                title: 'Error',
                description: 'Failed to update Category details.',
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
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Category Name</FormLabel>
                            <Input
                                name="title"
                                value={categoryName}
                                placeholder="Enter product name"
                                onChange={e => setcategoryName(e.target.value)}
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

export default EditCategory;
