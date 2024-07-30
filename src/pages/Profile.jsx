import { Center, Flex, Heading, Box, Text, Avatar, VStack } from '@chakra-ui/react';
import React, { Suspense, useState, useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import { auth } from '../appwrite/appwriteService'; // Import auth from appwriteService
import { ProductContext } from '../context/ProductContext'; // Import ProductContext

const Sidebar = React.lazy(() => import('../components/Sidebar'));

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setUser: setContextUser } = useContext(ProductContext); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await auth.getAccount();
                setUser(userData);
                setContextUser(userData); 

                document.cookie = `session=${JSON.stringify(userData)}; path=/; max-age=${2 * 24 * 60 * 60}`;
                console.log('Session cookie set');
            } catch (error) {
                console.error('Error fetching user data:', error.message);
                window.location.href = '/login'; 
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [setContextUser]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Sidebar />
                <Flex
                    ml={{ base: 0, md: '250px' }}
                    justify="center"
                    align="center"
                    minH="100vh"
                    bg="gray.100"
                    p={4}
                >
                    <Box
                        bg="white"
                        p={8}
                        borderRadius="md"
                        boxShadow="lg"
                        w={{ base: '90%', md: '100%' }}
                        maxW="md"
                        textAlign="center"
                        rounded={10}
                    >
                        <VStack spacing={4}>
                            <Avatar size="2xl" name={user.name || 'User'} src={user.avatarUrl || "https://bit.ly/broken-link"} />
                            <Heading size="lg" color="purple.700">{user.name || 'Your Name'}</Heading>
                            <Text fontSize="md" color="gray.600">
                                📧 {user.email || 'your.email@example.com'}
                            </Text>
                            <Text fontSize="md" color="gray.600">
                                📝 Bio: {user.bio || 'I’m not arguing, I’m just explaining why I’m right.'}
                            </Text>
                            <Text fontSize="md" color="gray.600">
                                🌍 Location: {user.location || 'Planet Earth, Not in the mood for a vacation.'}
                            </Text>
                        </VStack>
                    </Box>
                </Flex>
            </Suspense>
        </>
    );
}

export default Profile;
