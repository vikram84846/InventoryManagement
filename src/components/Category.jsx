import React, { useContext, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text, SimpleGrid, Card, CardBody, Heading, Flex, Icon, HStack } from '@chakra-ui/react';
import { FaCubesStacked } from "react-icons/fa6";
import { MdCategory } from 'react-icons/md';

import { ProductContext } from '../context/ProductContext';

function Category() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { category, fetchCategories } = useContext(ProductContext);

    const openModal = async () => {
        await fetchCategories();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card maxW='sm' boxShadow='xl'>
                <CardBody>
                    <Heading textAlign='center' size='md'>Total Categories</Heading>
                    <Flex justify='space-between' align='center' mt={4}>
                        <Button onClick={openModal} variant='ghost' colorScheme='purple'>
                            See All Categories
                        </Button>
                        <Flex align='center'>
                            <Icon as={FaCubesStacked} boxSize={5} />
                            <Heading size='md' ml={2}>{category.length}</Heading>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent maxW={{ base: '80%', md: 'md' }}> {/* Adjust width here */}
                    <ModalHeader>Categories</ModalHeader>
                    <ModalBody maxH="70vh" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        <SimpleGrid columns={1} spacing={4}>
                            {category.map((category, index) => (
                                <Card key={index}>
                                    <CardBody>
                                        <HStack justify={'space-between'}>
                                            <Text fontWeight='bold'>{category.name}</Text>
                                            <HStack>
                                                <Icon as={MdCategory} boxSize={4} />
                                                <Text fontSize={'large'} fontWeight='bold'>{category.products.length}</Text>
                                            </HStack>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Category;
