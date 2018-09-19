import { YIFYMovie } from "./YIFYMovie";

export interface YIFYMovieQuery {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: Array<YIFYMovie>;
}
