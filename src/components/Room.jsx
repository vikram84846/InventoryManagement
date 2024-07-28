import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardBody,
  Heading,
  Flex,
  Icon,
  useToast // Import useToast hook
} from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';
import { FaWarehouse } from 'react-icons/fa6';
import { db } from '../appwrite/appwriteService';

function Room() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { wareHouse, fetchWareHouse, user } = useContext(ProductContext);
  const toast = useToast(); // Initialize useToast hook

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleCreateLocation = async () => {
    try {
      const data = { name, description, userId: user.$id };
      await db.locations.create(data);
      setName('');
      fetchWareHouse();
      setDescription('');
      setIsOpen(false);

      // Show toast notification
      toast({
        title: 'Warehouse Created',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'left-accent'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create location.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'left-accent'
      });
    }
  };

  return (
    <div>
      <Card maxW='sm' boxShadow='xl'> {/* Adjust width here */}
        <CardBody>
          <Heading textAlign='center' size='md'>Current Warehouse</Heading>
          <Flex justify='space-between' gap={3} align='center' mt={4}>
            <Button onClick={handleOpen} variant='ghost' colorScheme='purple'>
              Add Warehouse
            </Button>
            <Flex align='center'>
              <Icon as={FaWarehouse} boxSize={5} />
              <Heading size='md' ml={2}>
                {wareHouse.length}
              </Heading>
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={handleClose} size={{ base: 'sm', md: 'md' }}> {/* Adjust modal size */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Location</ModalHeader>
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter location name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter location description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCreateLocation} colorScheme="purple">Create</Button>
            <Button onClick={handleClose} ml={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Room;
