import * as React from "react"
import { Flex } from "@chakra-ui/react"
import Seo from "../components/seo"
import Forecast from "../components/Forecast"

const IndexPage = () => (
  <Flex alignItems='center' justifyContent='center' direction='column' >
    <Seo title="Home" />
    <Forecast />
  
  </Flex>
)

export default IndexPage
