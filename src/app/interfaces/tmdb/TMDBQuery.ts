import {TMDBMovie} from "./TMDBMovie";

export interface TMDBQuery {
  page: number;
  results: Array<TMDBMovie>;
  total_pages: number;
  total_results: number;
}
