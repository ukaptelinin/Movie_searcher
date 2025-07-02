export interface MoviesResponse {
  id: number;
  name: string;
  alternativeName: string;
  enName: string;
  type: string;
  year: number;
  description: string;
  shortDescription: string;
  movieLength: number;
  names: [
    {
      name: string;
      language: string;
      type: string;
    },
  ];
  externalId: {
    kpHD: string;
    imdb: string;
    tmdb: number;
  };
  logo: {
    url: string;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  backdrop: {
    url: string;
    previewUrl: string;
  };
  rating: {
    kp: number;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  votes: {
    kp: string;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  genres: [
    {
      name: string;
    },
  ];
  countries: [
    {
      name: string;
    },
  ];
  releaseYears: [
    {
      start: number;
      end: number;
    },
  ];
  isSeries: boolean;
  ticketsOnSale: boolean;
  totalSeriesLength: number;
  seriesLength: number;
  ratingMpaa: string;
  ageRating: number;
  top10: number;
  top250: number;
  typeNumber: number;
  status: string;
}
