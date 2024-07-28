import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { MdPersonAdd } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { auth } from '../appwrite/appwriteService'; // Import auth from appwriteService
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();


  const navigate = useNavigate()
  const handleClick = () => setShow(!show);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await auth.create(name, email, password);
      // console.log(response);
      toast({
        title: "Account created.",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      if (response) {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error creating account: ', error.message);
      toast({
        title: "Error",
        description: error.message || "An error occurred while creating your account.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, purple.400, purple.800)"
    >
      <Box
        p={8}
        width={{ base: '90%', sm: '80%', md: '50%', lg: '40%' }}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="rgba(255, 255, 255, 0.08)"
      >
        <Stack spacing={4}>
          <Heading textAlign="center" size="xl">
            Sign Up
          </Heading>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
              <InputRightElement width="4.5rem">
                <Button variant={'ghost'} h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            leftIcon={<MdPersonAdd />}
            onClick={handleSignUp}
            isLoading={loading}
            isDisabled={loading}
          >
            Sign Up
          </Button>
          <Center w={'100%'}>
            <Link to={'/login'} color='white'>
              <Text fontSize={'sm'} color={'white'}>
                Already have an account? login
              </Text>
            </Link>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

export default SignUpPage;
