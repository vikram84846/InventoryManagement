import React, { useContext, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import { db } from '../appwrite/appwriteService';

function AddCategory() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryName, setCategoryName] = useState('');
    const { fetchCategories, user } = useContext(ProductContext);
    const toast = useToast(); // Initialize useToast hook

    const handleCreateCategory = async () => {

        const data = {
            name: categoryName,
            userId: user.$id
        }
        try {
            const response = await db.categories.create(data);
            // console.log(response);
            fetchCategories();
            onClose(); // Close modal after successful category creation
            setCategoryName('')
            // Show success toast notification
            toast({
                title: 'Category Created',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            });
        } catch (error) {
            console.error('Error creating category:', error);

            // Show error toast notification
            toast({
                title: 'Error',
                description: 'Failed to create category.',
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
                Add Category
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleCreateCategory}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='Enter category name'
                                    type='text'
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type='submit' variant='ghost' onClick={handleCreateCategory}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddCategory;
