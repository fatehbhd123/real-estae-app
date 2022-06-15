import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '0d95e8cc24mshe358d484a10ccf6p1c7219jsn27d38e26de1a',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        },
    });

    return data;
}