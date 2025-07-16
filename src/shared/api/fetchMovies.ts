import axios from 'axios';
import { MoviesResponse } from './types';

const BASE_URL = 'https://api.kinopoisk.dev/v1.4/movie/search';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = (
  title: string,
  pageNumber: number,
  limit: number = 20,
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
    .then((response) => {
      if (response.data.docs.length) {
        return response.data.docs;
      } else {
        return [];
      }
    })
    .catch((error) => {
      {
        error.message = 'Что-то пошло не так или фильмы не найдены?';
        throw error;
      }
    });
};
