import React, { useState, useEffect } from 'react'
import { useBoolean, Box, Spacer, FormControl, FormLabel, Switch, Skeleton, Input, Stack, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'
import { createStandaloneToast } from "@chakra-ui/react"
import CityCard from './CityCard'
import shortid from 'shortid'

function Forecast() {
    // const initialCities = typeof window !== 'undefined' ? JSON.parse(localStorage.cities) : []
    
    const [city, setCity] = useState();
    const [unit, setUnit] = useBoolean(true);
    const [cities, setCities] = useState(JSON.parse(localStorage.cities));
    const toast = createStandaloneToast()
    const appId = '72b0699b9062ee75120116984cf41032'

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            handleErr();
            throw new Error()
        }
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${!unit ? 'metric' : 'imperial'}&appid=${appId}`
        )
        .then(response => response.json())
        .then(r => {
            if (r.cod !== 200) {
                handleErr();
            }
            else return {
            id: shortid.generate(),
            name: r.name,
            temp: r.main.temp,
            description: r.weather[0].description,
            icon: r.weather[0].icon
        }})
        .then(response => {
            setCities([response, ...cities]);
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
                    <Switch colorScheme="teal" as="button" onChange={setUnit.toggle}/>                    
                    <FormLabel htmlFor="email-alerts" ml="3">
                        Celcius
                    </FormLabel>
                </FormControl>
                <Stack>
                    {cities.map(city => (
                        <CityCard 
                            name={city.name} 
                            temp={city.temp} 
                            description={city.description}
                            icon={city.icon}
                            onDelete={()=> handleDelete(city.id)}
                        />
                        ))
                    }
                </Stack>                    
            </Box>
        </Stack>
    )
}

export default Forecast
