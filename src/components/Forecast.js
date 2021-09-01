import React, { useState, useEffect } from 'react'
import { Box, Spacer, useBoolean, FormControl, FormLabel, Switch, Skeleton, Input, Stack, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'
import { createStandaloneToast } from "@chakra-ui/react"
import CityCard from './CityCard'
import shortid from 'shortid'

function Forecast() {
    defaultCity = {
        id: shortid.generate(),
        name: 'kiev',
        temp: 23,
        unit: 'metric',
        description: 'light intensity drizzle',
        icon: '09d'
}

    localStorage.cities = JSON.stringify([defaultCity]);
    const initialCities = typeof window !== 'undefined' ? JSON.parse(localStorage.cities) : []
    
    const [city, setCity] = useState('London');
    const [boolean, setBoolean] = useBoolean(false);
    const [cities, setCities] = useState(initialCities);
    const toast = createStandaloneToast()
    const appId = '72b0699b9062ee75120116984cf41032'

    const generateUnit = (boolean) => (boolean ? 'metric' : 'imperial')

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            handleErr();
            throw new Error()
        }
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${generateUnit(boolean)}&appid=${appId}`
        )
        .then(response => response.json())
        .then(r => {
            if (r.cod !== 200) {
                handleErr();
                return null
            }
            else return {
                id: shortid.generate(),
                name: r.name,
                temp: r.main.temp,
                unit: generateUnit(boolean),
                description: r.weather[0].description,
                icon: r.weather[0].icon
        }})
        .then(response => {
            setCities([response.name ? response : null, ...cities]);
        })
        .catch(err => {
            console.log(err.message);
        });
        setCity('');
    }

    useEffect(() => {
        localStorage.cities = JSON.stringify(cities);
      }, [cities]);

    function handleDelete(id) {
        setCities(cities.filter(item => item.id !== id))
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
                <form onSubmit={getForecast}>
                <InputGroup >
                    <Input 
                        variant="filled"
                        placeholder="Enter city"
                        type="text"
                        maxLength="50"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <InputRightElement children={<IconButton onClick={getForecast} aria-label="Search" icon={<SearchIcon />} />} />
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
                    {
                        cities ? cities.map(city => (
                            <CityCard 
                                name={city.name} 
                                temp={city.temp}
                                unit={city.unit}
                                description={city.description}
                                icon={city.icon}
                                onDelete={()=> handleDelete(city.id)}
                            />
                            ))
                        :
                        <Skeleton>
                            <Box p={6}></Box>
                        </Skeleton>
                    }
                </Stack>                    
            </Box>
        </Stack>
    )
}

export default Forecast
