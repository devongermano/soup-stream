import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TMDBQuery} from "../interfaces/tmdb/TMDBQuery";
import {YifyQuery} from "../interfaces/yify/YifyQuery";
import {YIFYMovieQuery} from "../interfaces/yify/YIFYMovieQuery";
import {YIFYMovie} from "../interfaces/yify/YIFYMovie";
import {TMDBMovie} from "../interfaces/tmdb/TMDBMovie";


@Injectable()
export class MovieService {

  private baseURL = 'https://yts.am/api/v2/list_movies.json';
  private TMDBKey = '?api_key=5d1968c030b062211c4062e6f5300b59';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<YIFYMovie[]> {
    return this.http.get<YifyQuery<YIFYMovieQuery>>(this.baseURL).pipe(map(
      yifyQuery => yifyQuery.data.movies
    ));
  }

  // searchMovies(query_term: string): Observable<YIFYMovie[]> {
  //   let formatted_query_term = encodeURI(query_term);
  //   return this.http.get(`https://yts.am/api/v2/list_movies.json?query_term=${formatted_query_term}`)
  //     .pipe(map(yifyResult => yifyResult[0]))
  // }

  getTMDBTrendingMoviesWeek(): Observable<Array<TMDBMovie>> {
    return this.http.get<TMDBQuery>(`https://api.themoviedb.org/3/trending/movie/week${this.TMDBKey}`)
      .pipe(map(tmdbQuery => tmdbQuery.results
      ));
  }

  getTMDBTrendingMoviesDay(): Observable<Array<TMDBMovie>> {
    return this.http.get<TMDBQuery>(`https://api.themoviedb.org/3/trending/movie/day${this.TMDBKey}`)
      .pipe(map(tmdbQuery => tmdbQuery.results
      ));
  }

  getTMDBPosterUrl(poster_path: string): string {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  }

  getTMDBTorrent(movie: TMDBMovie): Observable<YIFYMovie> {
    return this.searchMovies(movie.title).pipe(map((movies: YIFYMovie[]) => {
      return movies[1]
    }));
  }

  searchMovies(query_string: string): Observable<YIFYMovie[]> {
    if (!query_string || query_string === "") return;
    let encoded_query_string = encodeURI(query_string.trim());
    return this.http.get<YifyQuery<YIFYMovieQuery>>(`${this.baseURL}?=${encoded_query_string}`)
      .pipe(map(yifyQuery => yifyQuery.data.movies));
  }
}
