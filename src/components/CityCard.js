import React from 'react'
import {Flex, Stat, StatHelpText, useColorModeValue, Center, StatLabel, StatNumber, Image, Box, Divider, Spacer, CloseButton } from "@chakra-ui/react"

function CityCard({name, temp, description, icon, onDelete}) {
    
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    return (
        <Box background={formBackground} borderRadius='lg'>
            <Flex p={3}>
                <Box w={1/3}>
                    <Stat>
                        <StatLabel>{name}</StatLabel>

                        <StatNumber>
                            {temp}° C
                        </StatNumber>
                        <StatHelpText>
                            {description}
                        </StatHelpText> 
                    </Stat>
                </Box>
                <Center w={1/3}>
                    <Box >
                        <Image src={'http://openweathermap.org/img/w/' + icon + '.png'}/>
                    </Box>
                </Center>
                <Spacer/>
                <CloseButton mr={0} onClick={onDelete}/>
            </Flex>
        </Box>
    )
}

export default CityCard
