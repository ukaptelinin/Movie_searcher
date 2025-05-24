import axios from 'axios';
import { MoviesResponse } from '@/app/providers/MoviesResponseContextProvider/context';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = 'b168952b';

export const getMovies = async (
  title: string,
): Promise<MoviesResponse | null> => {
  try {
    const response = await axios.get<MoviesResponse>(BASE_URL, {
      params: {
        apikey: API_KEY,
        t: title,
      },
    });

    const movieData = response.data;

    if (movieData.Response === 'True') {
      return movieData;
    } else {
      console.error('Ошибка: фильм не найден');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
