import React, { useContext, useState } from 'react';
import { Button, Card, CardBody, Heading, Flex, Icon, HStack, VStack } from '@chakra-ui/react';
import { FaBoxesStacked } from "react-icons/fa6";
import { MdCategory } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ProductContext } from '../context/ProductContext';

function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { products, fetchProducts } = useContext(ProductContext);

    const openModal = async () => {
        await fetchProducts();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card maxW='sm'  boxShadow='xl'> {/* Adjust width here */}
                <CardBody>
                    <Heading textAlign={'center'} size='md'>Total Products</Heading>
                    <Flex justify='space-between' align='center' mt={4}>
                        <Link to="/products">
                            <Button variant='ghost' colorScheme='purple' onClick={openModal}>
                                See All Products
                            </Button>
                        </Link>
                        <Flex align='center'>
                            <Icon as={FaBoxesStacked} boxSize={5} />
                            <Heading size='md' ml={2}>{products.length}</Heading>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>
        </>
    );
}

export default Products;
