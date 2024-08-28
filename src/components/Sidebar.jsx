import React from 'react';
import {
    Flex, VStack, Text, Center, Button,
    useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    IconButton, useBreakpointValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; // Importing hamburger icon for the drawer toggle
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import AddProduct from '../functionality/AddProduct';
import AddCategory from '../functionality/AddCategory';
import UpdateStock from '../functionality/UpdateStock';
import Logout from './Logout';

function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isDrawer = useBreakpointValue({ base: true, md: false }); // Determine if the screen size should show the drawer

    return (
        <>
            {isDrawer ? (
                // Drawer for mobile view
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    placement="left"
                    size="md"
                >
                    <DrawerOverlay>
                        <DrawerContent
                            bgColor={'purple.500'}
                            color={'white'}
                        >
                            <DrawerCloseButton />
                            <DrawerHeader>Inventory Store</DrawerHeader>
                            <DrawerBody>
                                <VStack spacing={4} align="start">
                                    <Link to="/home">
                                        <Button
                                            variant={'ghost'}
                                            color={'white'}
                                            fontWeight={'bold'}
                                            fontSize={'large'}
                                            _hover={{ bg: 'purple.100' }}
                                        >
                                            Home
                                        </Button>
                                    </Link>
                                    <UpdateStock />
                                    <AddProduct />
                                    <AddCategory />
                                    <Link to="/products">
                                        <Button
                                            variant={'ghost'}
                                            color={'white'}
                                            fontWeight={'bold'}
                                            fontSize={'large'}
                                            _hover={{ bg: 'purple.100' }}
                                        >
                                            All Products
                                        </Button>
                                    </Link>
                                    <Link to="/history">
                                        <Button
                                            variant={'ghost'}
                                            color={'white'}
                                            fontWeight={'bold'}
                                            fontSize={'large'}
                                            _hover={{ bg: 'purple.100' }}
                                        >
                                            History
                                        </Button>
                                    </Link>
                                </VStack>
                            </DrawerBody>
                            <DrawerFooter>
                                <VStack align="start" spacing={4} w="100%">
                                    <Link to={'/profile'}>
                                        <Button
                                            p={5}
                                            leftIcon={<FaUserAlt />}
                                            variant={'ghost'}
                                            color={'white'}
                                            fontWeight={'bold'}
                                            fontSize={'large'}
                                            _hover={{ bg: 'purple.700' }}
                                        >
                                            Profile
                                        </Button>
                                    </Link>
                                    <Logout />
                                </VStack>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            ) : (
                // Sidebar for larger screens
                <Flex
                    w="250px"
                    h="100vh"
                    color="white"
                    bg="purple.500" // Background color
                    p={4}
                    position="fixed"
                    left={0}
                    top={0}
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    zIndex={2}
                >
                    <Center h={'15vh'} w="250px">
                        <Link to={'/home'}>
                            <Text fontSize="4xl" fontWeight="bold" letterSpacing="wide" mb={4}>Inventory Store</Text>
                        </Link>
                    </Center>
                    <VStack spacing={4} align="center" justify="space-between" mt={4} mb={4} h="100%">
                        <VStack align="center" spacing={4}>
                            <Link to="/home">
                                <Button
                                    p={5}
                                    variant={'ghost'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    fontSize={'large'}
                                    _hover={{ bg: 'purple.700' }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <UpdateStock />
                            <AddProduct />
                            <AddCategory />
                           
                            <Link to="/products">
                                <Button
                                    p={5}
                                    variant={'ghost'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    fontSize={'large'}
                                    _hover={{ bg: 'purple.700' }}
                                >
                                    All Products
                                </Button>
                            </Link>
                            <Link to="/history">
                                <Button
                                    p={5}
                                    variant={'ghost'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    fontSize={'large'}
                                    _hover={{ bg: 'purple.700' }}
                                >
                                    History
                                </Button>
                            </Link>
                        </VStack>
                        <VStack align="center" spacing={4}>
                            <Link to={'/profile'}>
                                <Button
                                    p={5}
                                    leftIcon={<FaUserAlt />}
                                    variant={'ghost'}
                                    color={'white'}
                                    fontWeight={'bold'}
                                    fontSize={'large'}
                                    _hover={{ bg: 'purple.700' }}
                                >
                                    Profile
                                </Button>
                            </Link>
                            <Logout />
                        </VStack>
                    </VStack>
                </Flex>
            )}
            {/* Drawer Toggle Button */}
            {isDrawer && (
                <IconButton
                    aria-label="Open Sidebar"
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                    position="fixed"
                    top={4}
                    left={4} // Shift button to the left side
                    zIndex={3}
                    colorScheme="purple"
                />
            )}
        </>
    );
}

export default Sidebar;
