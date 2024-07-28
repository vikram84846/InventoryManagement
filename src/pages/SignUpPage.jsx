import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { MdPersonAdd } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { db } from '../appwrite/appwriteService'; // Import db from appwriteService

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const user = {
    name: name,
    email: email,
    password: password,
    bio: bio,
    birth: dob
  }

  const handleSignUp = async () => {
    if (!name || !email || !dob || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill out all required fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
      return;
    }

    setLoading(true);
    try {
      // Create a new user document
      const response = await db.users.create(user);

      toast({
        title: 'Sign Up successful',
        description: `${name} your account has been created`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      console.log('Document created successfully:', response);
    } catch (error) {
      toast({
        title: 'Sign Up failed',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
      console.error('Error creating document:', error);
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
          <FormControl id="dob" isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              placeholder="Enter your date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              aria-label="Date of Birth"
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
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Tell us a bit about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              aria-label="Bio"
            />
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
        </Stack>
      </Box>
    </Box>
  );
}

export default SignUpPage;
