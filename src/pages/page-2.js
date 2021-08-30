import * as React from "react"
import { Button, Flex, Heading, Input, useColorModeValue } from '@chakra-ui/react'
import Seo from "../components/seo"

export default function SecondPage () {
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  return(
    <>
    <Seo title="Page two" />    
    <Flex mt={24} mb={24} alignItems='center' justifyContent='center'>
      <Flex direction='column' background={formBackground} p={12} rounded={6} >
        <Heading mb={6}>Log in</Heading>
        <Input placeholder='email' variant='filled' mb={3} type='email'></Input>
        <Input placeholder='********' variant='filled' mb={6} type='password'></Input>
        <Button colorScheme='teal'>Log in</Button>
        
      </Flex>
    </Flex>
    </>
  )
}

