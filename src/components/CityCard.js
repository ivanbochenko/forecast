import React from 'react'
import {Flex, Stat, StatHelpText, Center, StatLabel, StatNumber, Image, Box, Divider, Spacer, CloseButton, Grid  } from "@chakra-ui/react"

function CityCard({name, temp, description, icon, onDelete}) {
    return (
        <Box>
            <Flex>
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

            <Divider />
        </Box>
    )
}

export default CityCard
