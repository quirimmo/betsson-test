import Movie, { MovieRawData } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MoviesDAOService {
	constructor(private http: HttpClient) {}

	public fetchMovies(): Observable<Movie[]> {
		return this.http
			.get('assets/movies.mock-data.json')
			.pipe(
				map((data: MovieRawData[]) =>
					data.map(rawMovie => Movie.buildInstanceFromRaw(rawMovie))
				)
			);
	}
}
