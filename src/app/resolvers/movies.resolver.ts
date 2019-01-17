import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesActions } from '../movies/movies.actions';
import Movie from '../movies/movie.model';

@Injectable()
export class MoviesResolver implements Resolve<Movie[]> {
	constructor(private actions: MoviesActions) {}

	resolve(): Observable<Movie[]> {
		return this.actions.fetchMovies();
	}
}
