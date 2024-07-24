import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react';
import { loginAccount } from '../appwrite/Services';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import { MdLogin } from 'react-icons/md';
import { ProductContext } from '../context/ProductContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(ProductContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await loginAccount(email, password);
            setUser(response);
            document.cookie = `session=${JSON.stringify(response)}; path=/; max-age=${2 * 24 * 60 * 60}`;
            console.log('Session cookie set');
            navigate('/home', { replace: true });
            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            toast({
                title: 'Login failed',
                description: error.message,
                status: 'error',
                duration: 3000,
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
                        Login
                    </Heading>
                    <FormControl id="username">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            variant={'outline'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        leftIcon={<MdLogin />}
                        onClick={handleLogin}
                        isLoading={loading}
                    >
                        Sign In
                    </Button>
                </Stack>
                <Logout />
            </Box>
        </Box>
    );
}

export default LoginPage;
