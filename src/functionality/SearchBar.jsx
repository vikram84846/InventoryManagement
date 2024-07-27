import { Flex, Input, IconButton, useToast, Box, List, ListItem } from '@chakra-ui/react'
import React, { useContext, useState, useEffect } from 'react'
import { searchProduct } from '../appwrite/Services'
import { ProductContext } from '../context/ProductContext'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const toast = useToast()
  const [productName, setProductName] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const { products } = useContext(ProductContext)
  const navigate = useNavigate();

  // Fetch suggestions based on user input
  useEffect(() => {
    if (productName.length >= 2) {
      setLoading(true)
      const filteredSuggestions = products.filter((product) =>
        product.title.toLowerCase().includes(productName.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
      setLoading(false)
    } else {
      setSuggestions([])
    }
  }, [productName, products])

  const handleSearch = async () => {
    try {
      if (productName === '') {
        toast({
          title: 'Error',
          description: 'Please enter a product name',
          position: 'top-right',
          status: 'error',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent'
        })
        return
      }
      const productselected = suggestions.find((product) => product.title === productName)
      if (productselected) {
        const idOfProduct = (productselected.$id).toString()
        const response = await searchProduct(idOfProduct)
        toast({
          title: 'Product found',
          description: productName,
          position: 'top-right',
          status: 'success',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent'
        })
        if (response) {
          navigate('/search', { state: { query: response } })
        }
      } else {
        toast({
          title: 'Error',
          description: 'Product not found',
          position: 'top-right',
          status: 'error',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Product not found',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent'
      })
    }
  }

  const handleSuggestionClick = async (title) => {
    setProductName(title)
    setSuggestions([])
    await handleSearch() // Trigger search after selecting suggestion
  }

  return (
    <Flex direction="row" align="center" position="relative">
      <Input
        placeholder="Search..."
        variant="filled"
        flex="1"
        ml={10}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
        color="purple.500"
        border="1px solid"
        borderColor="purple.500"
        _focus={{
          borderColor: 'purple.700',
        }}
        _hover={{
          borderColor: 'purple.700',
        }}
        _placeholder={{
          color: 'purple.500',
        }}
      />
      <IconButton
        ml={2} // Add margin to keep it next to the input
        color={'purple.500'}
        aria-label="Search database"
        onClick={handleSearch}
        icon={<SearchIcon />}
      />
      {suggestions.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="100%"
          borderRadius="md"
          boxShadow="md"
          bg="white"
          zIndex="dropdown"
          mt={1} // Add margin to separate from input field
        >
          <List maxHeight={'90vh'} overflowY={'scroll'} spacing={1}>
            {suggestions.map((product) => (
              <ListItem
                key={product.$id}
                p={2}
                _hover={{ bg: 'purple.100', cursor: 'pointer' }}
                onClick={() => handleSuggestionClick(product.title)}
              >
                {product.title}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Flex>
  )
}

export default SearchBar
