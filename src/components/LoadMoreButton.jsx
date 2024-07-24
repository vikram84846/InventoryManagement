import { Button, Center } from '@chakra-ui/react'
import React from 'react'

const LoadMoreButton = () => {
    return (
        <Center w={'100%'}>
            <Button
                size="lg"
                variant="ghost"
                padding="8px 24px"
                fontSize="16px"
                // fontWeight="bold"
                w={150}
                color={'purple.500'}
                _hover={{ color: 'purple.800' }}
            >
                Load More
            </Button>
        </Center>
    )
}

export default LoadMoreButton