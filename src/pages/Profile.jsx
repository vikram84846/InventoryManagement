import { Center, Flex, Heading, Box, Text, Avatar, VStack } from '@chakra-ui/react';
import React, { Suspense, useState, useEffect } from 'react';
import Loading from '../components/Loading';
import getSession from '../utils';
const Sidebar = React.lazy(() => import('../components/Sidebar'));

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = getSession();
        if (session) {
            setUser(session);
        }
    }, []);

    if (!user) {
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
                            <Avatar size="2xl" name={user.name || 'User'} src="https://bit.ly/broken-link" />
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
