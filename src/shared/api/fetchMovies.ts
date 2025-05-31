import axios from 'axios';
import { MoviesResponse } from '../models/types';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = 'b168952b';
const PAGE_SIZE = 5;

export const fetchMovies = async (
  title: string,
  pageNumber: number,
): Promise<MoviesResponse[]> => {
  const response = await axios.get<{
    Search?: MoviesResponse[];
    Response: string;
  }>(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: title,
      type: 'movie',
      page: pageNumber,
      size: PAGE_SIZE,
    },
  });

  const movieData = response.data;

  if (movieData.Response === 'True' && movieData.Search) {
    return movieData.Search;
  }
  return [];
};
