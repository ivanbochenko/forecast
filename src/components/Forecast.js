import React, { useState } from 'react'
import { Box, Spacer, useBoolean, FormControl, FormLabel, Switch, Skeleton, SkeletonText, SkeletonCircle, Input, Stack, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'
import { createStandaloneToast } from "@chakra-ui/react"
import CityCard from './CityCard'
import shortid from 'shortid'

const Forecast = () => {
    const [city, setCity] = useState('');
    const [boolean, setBoolean] = useBoolean(false);
    const [cities, setCities] = useState([]);
    const toast = createStandaloneToast()
    const appId = '72b0699b9062ee75120116984cf41032'
    const generateUnit = (boolean) => (boolean ? 'metric' : 'imperial')

    const getForecast = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${generateUnit(boolean)}&appid=${appId}`
            )
            const r = await response.json()
            return {
                    id: shortid.generate(),
                    name: r.name,
                    temp: r.main.temp,
                    unit: generateUnit(boolean),
                    description: r.weather[0].description,
                    icon: r.weather[0].icon
                } 
    
        } catch (error) {
            console.log(error)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (city.length === 0) {handleErr()} 
        else {getForecast().then(v=>v ? setCities([v, ...cities]) : handleErr())}
        setCity('')
    }

    
    function handleErr() {
        toast({
            title: "Warning.",
            description: "Wrong city name.",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
    }

    return (
        <Stack w="100%" spacing={6}>
            <Box mt={6}>
                <form onSubmit={handleSubmit}>
                <InputGroup >
                    <Input 
                        variant="filled"
                        placeholder="Enter city"
                        type="text"
                        maxLength="50"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <InputRightElement children={<IconButton onClick={handleSubmit} aria-label="Search" icon={<SearchIcon />} />} />
                </InputGroup>
                </form>                
                <FormControl display="flex" alignItems="center" mb='3' mt='3'>
                    <Spacer/>
                    <FormLabel htmlFor="email-alerts" mr="3">
                        Fahrenheit
                    </FormLabel>
                    <Switch colorScheme="teal" onChange={setBoolean.toggle}/>                    
                    <FormLabel htmlFor="email-alerts" ml="3">
                        Celcius
                    </FormLabel>
                </FormControl>
                <Stack>
                    {cities.map(city => (
                        <CityCard
                            name={city.name} 
                            temp={city.temp}
                            unit={city.unit}
                            description={city.description}
                            icon={city.icon}
                            onDelete={()=> setCities(cities.filter(item => item.id !== city.id))}
                        />
                    ))}
                </Stack>                    
            </Box>
        </Stack>
    )
}
export default Forecast