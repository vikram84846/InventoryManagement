// LoginWithGoogle.js
import React from 'react';
import { auth } from '../appwrite/appwriteService';
import { Button, Center } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function LoginWithGoogle() {
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        try {
            const response = await auth.loginWithGoogle(); 
            if (response) {
                navigate('/profile', { replace: true });
            }
        } catch (error) {
            console.error('Error initiating Google login:', error.message);
        }
    };

    return (
        <Center>
            <Button
                onClick={handleGoogleLogin}
                leftIcon={<FcGoogle />}
                w={['auto', '60%']}
            >
                Continue with Google
            </Button>
        </Center>
    );
}

export default LoginWithGoogle;
