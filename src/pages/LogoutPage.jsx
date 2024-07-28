import React from 'react'
import Logout from '../components/Logout'
import { Center } from '@chakra-ui/react'

function LogoutPage() {
    return (
        <>
            <Center w={'full'} h={'100vh'} bgColor={'purple.500'}>
                <Logout />
            </Center>
        </>

    )
}

export default LogoutPage