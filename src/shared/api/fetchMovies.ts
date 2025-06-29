import axios from 'axios';
import { MoviesResponse } from './types';

const BASE_URL = 'https://api.kinopoisk.dev/v1.4/movie/search';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = (
  title: string,
  pageNumber: number,
  limit: number = 20
): Promise<MoviesResponse[]> => {
  return axios
    .get<{
      docs: MoviesResponse[];
      total: number;
      limit: number;
      page: number;
      pages: number;
    }>(BASE_URL, {
      params: {
        page: pageNumber,
        limit: limit,
        query: title,
      },
      headers: {
        accept: 'application/json',
        'X-API-KEY': API_KEY,
      },
    })
    .then(response => {
      if (!response.data.docs.length) {
        throw new Error('Фильмы не найдены');
      }
      return response.data.docs;
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(`Ошибка запроса: ${errorMessage}`);
      }
      throw error;
    });
};

