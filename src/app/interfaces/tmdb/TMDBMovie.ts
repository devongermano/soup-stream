import {TMDBGenreId} from "./TMDBGenreId";

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<TMDBGenreId>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
}
