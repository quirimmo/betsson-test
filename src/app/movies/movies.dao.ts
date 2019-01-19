import Movie, { MovieRawData } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

export const LOCAL_DATA = 'assets/movies.mock-data.json';
export const TMDB_API_BASE_URL = `https://api.themoviedb.org/3/`;
export const TMDB_API_MOVIE_ENDPOINT = `movie`;
export const TMDB_API_MOVIE_ENDPOINT_URL = `${TMDB_API_BASE_URL}${TMDB_API_MOVIE_ENDPOINT}`;
export const TMDB_API_VIDEOS_ENDPOINT = `videos`;
export const TMDB_API_KEY = '53dac0ef884884dfee672ca40713c063';
export const TMDB_API_KEY_QUERY_PARAM = `api_key=${TMDB_API_KEY}`;

@Injectable({
	providedIn: 'root'
})
export class MoviesDAOService {
	movies: any;

	constructor(private http: HttpClient) {
		this.movies = this.http
			.get(LOCAL_DATA)
			.pipe(map(buildMoviesFromData))
			.pipe(publishReplay());
		this.movies.connect();

		function buildMoviesFromData(data: MovieRawData[]): Movie[] {
			return data.map(Movie.buildInstanceFromRaw);
		}
	}

	public fetchMovies(): Observable<Movie[]> {
		return this.movies;
	}

	public getDetailsRequests(tmdb: number): Observable<any>[] {
		const start = `${TMDB_API_MOVIE_ENDPOINT_URL}/${tmdb}`;
		const requestsURL: string[] = [
			`${start}?${TMDB_API_KEY_QUERY_PARAM}`,
			`${start}/${TMDB_API_VIDEOS_ENDPOINT}?${TMDB_API_KEY_QUERY_PARAM}`
		];
		return requestsURL.map((r: string) => this.http.get(r));
	}

	public fetchMovieDetails(movie: Movie): Observable<Movie> {
		return forkJoin(this.getDetailsRequests(movie.tmdb)).pipe(
			map(buildMovieDetails)
		);

		function buildMovieDetails([info, contents]: any) {
			return movie.buildDetails(info, contents);
		}
	}
}
