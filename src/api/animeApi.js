import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchTopAnime = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top/anime`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
}

export const searchAnime = async (searchValue) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime?q=${searchValue}`);
    return response.data.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
}