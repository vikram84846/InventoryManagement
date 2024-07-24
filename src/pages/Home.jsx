import React, { Suspense } from 'react';
const Sidebar = React.lazy(() => import('../components/Sidebar'));
import Category from '../components/Category';
import Products from '../components/Products';
import { Divider, HStack, VStack, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import History from '../functionality/History';
import GraphChart from '../functionality/GraphChart';
import Room from '../components/Room';
import Loading from '../components/Loading';

function Home() {
    return (
        <Box>
            <Suspense fallback={<Loading />}>
                <Sidebar />
                <Header />
                <Box ml={{ base: '0', md: '250px' }} p={4}> {/* Make margin responsive */}
                    <VStack spacing={6}>
                        <HStack
                            justify="space-evenly"
                            wrap="wrap"
                            spacing={4}
                            marginY={2}
                            w="100%"
                        >
                            <Category />
                            <Room />
                            <Products />
                        </HStack>
                        <Divider
                            w={{ base: '90%', md: '80%' }} // Adjust width based on screen size
                            borderWidth="2px"
                        />
                        <HStack
                            justify="space-evenly"
                            wrap="wrap"
                            spacing={4}
                            w="100%"
                        >
                            <GraphChart />
                            <History />
                        </HStack>
                    </VStack>
                </Box>
            </Suspense>
        </Box>
    );
}

export default Home;
