import { createContext, FC, ReactNode, useState } from 'react';

export interface MovieRatings {
  Source: string;
  Value: string;
}

export interface MoviesResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  addMovies: (newMovies: MoviesResponse[]) => void;
}

export const MoviesResponseContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  addMovies: () => {},
});

const MoviesResponseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);

  const addMovies = (newMovies: MoviesResponse[]): void => {
    setMoviesList((currentMovies) => [...currentMovies, ...newMovies]);
  };

  return (
    <MoviesResponseContext.Provider
      value={{
        moviesList,
        addMovies,
      }}
    >
      {children}
    </MoviesResponseContext.Provider>
  );
};

export default MoviesResponseContextProvider;
