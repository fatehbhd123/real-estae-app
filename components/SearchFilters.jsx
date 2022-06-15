import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export default function SearchFilters() {
    const [filters] = useState(filterData);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData, setLocationData] = useState();
    const [showLocations, setShowLocations] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues)

        values.forEach((item) => {
            if (item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        })

        router.push({ pathname: path, query: query });
    };

    useEffect(() => {
        if (searchTerm !== '') {
            const fetchData = async () => {
                setLoading(true);
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLoading(false);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm]);

    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters?.map((filter) => (
                <Box key={filter.queryName}>
                    <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
            <Flex flexDir='column'>
                <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
                    Search Location
                </Button>
                {showLocations && (
                    <Flex flexDir='column' pos='relative' paddingTop='2'>
                        <Input
                            placeholder='Type Here'
                            value={searchTerm}
                            w='300px'
                            focusBorderColor='gray.300'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm !== '' && (
                            <Icon
                                as={MdCancel}
                                pos='absolute'
                                cursor='pointer'
                                right='5'
                                top='5'
                                zIndex='100'
                                onClick={() => setSearchTerm('')}
                            />
                        )}
                        {loading && <Spinner margin='auto' marginTop='3' />}
                        {showLocations && (
                            <Box height='300px' overflow='auto'>
                                {locationData?.map((location) => (
                                    <Box
                                        key={location.id}
                                        onClick={() => {
                                            searchProperties({ locationExternalIDs: location.externalID });
                                            setShowLocations(false);
                                            setSearchTerm(location.name);
                                        }}
                                    >
                                        <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                                            {location.name}
                                        </Text>
                                    </Box>
                                ))}
                                {!loading && !locationData?.length && (
                                    <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                                        <Image src={"data:image/png;base64,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"} />
                                        <Text fontSize='xl' marginTop='3'>
                                            Waiting to search!
                                        </Text>
                                    </Flex>
                                )}
                            </Box>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}