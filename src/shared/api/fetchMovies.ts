import axios from 'axios';
import { MoviesResponse } from './types';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_API_KEY;
export const fetchMovies = async (title: string, pageNumber: number): Promise<MoviesResponse[]> => {
  const response = await axios.get<{
    Error: string;
    Search?: MoviesResponse[];
    Response: string;
  }>(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: title,
      type: 'movie',
      page: pageNumber,
    },
  });
  const movieData = response.data;

  if (movieData.Response === 'True' && movieData.Search) {
    return movieData.Search;
  }
  throw new Error(movieData.Error || 'Фильмы не найдены');
};
