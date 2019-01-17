import Movie, { MovieRawData } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MoviesDAOService {
	movies: any;

	constructor(private http: HttpClient) {
		this.movies = this.http
			.get('assets/movies.mock-data.json')
			.pipe(
				map((data: MovieRawData[]) =>
					data.map(rawMovie => Movie.buildInstanceFromRaw(rawMovie))
				)
			)
			.pipe(publishReplay());
		this.movies.connect();
	}

	public fetchMovies(): Observable<Movie[]> {
		return this.movies;
	}
}
