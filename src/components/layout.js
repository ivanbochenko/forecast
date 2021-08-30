/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Box } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'

import Header from "./Header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Box as="div" p={6} m="0 auto" maxWidth="960px" >
        <Box as="main" >{children}</Box>
        <Box as="footer" mt={6} mb={6} fontSize="xl">
          © {new Date().getFullYear()}, Built by
          {` `}
          <a as={GatsbyLink} isExternal color="teal.300" href="https://ivanbochenko.github.io" >
            Ivan Bochenko
          </a>
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
