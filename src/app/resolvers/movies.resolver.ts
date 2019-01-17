import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MoviesActions, MoviesAction } from '../movies/movies.actions';
import Movie from '../movies/movie.model';
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesResolver implements Resolve<Movie[]> {
	constructor(private actions: MoviesActions) {}

	resolve(): Observable<Movie[]> {
		return this.actions.fetchMovies();
	}
}
