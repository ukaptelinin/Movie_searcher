import axios from 'axios';
import { MoviesResponse } from '@/app/providers/MoviesResponseContextProvider/context';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = 'b168952b';

export const getMovies = async (title: string): Promise<MoviesResponse[]> => {
  try {
    const response = await axios.get<{
      Search?: MoviesResponse[];
      Response: string;
    }>(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: title,
        type: 'movie',
        page: 1,
      },
    });

    const movieData = response.data;

    if (movieData.Response === 'True' && movieData.Search) {
      return movieData.Search;
    } else {
      console.error('Фильмы не найдены');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
