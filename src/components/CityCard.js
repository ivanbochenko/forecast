import React from 'react'
import {Flex, Stat, StatHelpText, useColorModeValue, Center, StatLabel, StatNumber, Image, Box, Spacer, CloseButton } from "@chakra-ui/react"

const CityCard = ({name, temp, unit, description, icon, onDelete}) => {
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    return (
        <Box background={formBackground} borderRadius='lg'>
            <Flex p={3}>
                <Box w={1/3}>
                    <Stat size="sm">
                        <StatLabel>{name}</StatLabel>

                        <StatNumber>
                            {temp}° {unit === 'metric' ? 'C' : 'F'}
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