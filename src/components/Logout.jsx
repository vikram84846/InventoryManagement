import { Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { auth } from '../appwrite/appwriteService';

function Logout() {
    const toast = useToast(); // Initialize useToast hook
    const navigate = useNavigate();
    const { setUser } = useContext(ProductContext);

    const handleLogout = async () => {
        try {
            await auth.logout();
            document.cookie = 'session=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            console.log('Session cookie cleared');
            setUser(null); // Ensure user context is cleared if used
            navigate('/', { replace: true });
            toast({
                title: 'Logout successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            toast({
                title: 'Logout failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        }
    };


    return (
        <>
            <Button
                leftIcon={<MdLogout />}
                variant={'ghost'}
                color={'white'}
                fontWeight={'bold'}
                fontSize={'large'}
                _hover={{ bg: 'purple.700' }}
                onClick={handleLogout}
                mt={3}
            >
                Logout
            </Button>

        </>
    );
}

export default Logout;
