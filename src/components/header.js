import { Box, Heading, Link, Spacer, Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import ThemeToggle from './theme-toggle'


function Header ({ siteTitle }) {
    
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  return(
    <Flex background={formBackground} p="6" as="header">
    <Box>
      <Link text-decoration='none' as={GatsbyLink} to="/" >
        <Heading color='teal.300' size="xl">{siteTitle}</Heading>
      </Link>        
    </Box>
    <Spacer/>
    <ThemeToggle/>
  </Flex>
  )
}
export default Header