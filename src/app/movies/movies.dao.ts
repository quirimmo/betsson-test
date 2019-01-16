import Movie, { MovieRawData } from './movie.model';
import { HttpClient } from '@angular/common/http';
import {
	tap,
	map,
	take,
	publish,
	takeWhile,
	takeUntil,
	share,
	publishReplay,
	refCount
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
	Observable,
	of,
	Subject,
	Subscription,
	ConnectableObservable
} from 'rxjs';

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
