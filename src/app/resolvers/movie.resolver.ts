import { Injectable } from '@angular/core';
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MoviesActions, MoviesAction } from '../movies/movies.actions';
import Movie from '../movies/movie.model';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieResolver implements Resolve<Movie> {
	constructor(private actions: MoviesActions) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Movie> {
		console.log('route param:', route.params.id);
		return this.actions
			.dispatchFetchMoviesThunk()
			.pipe(
				map((data: MoviesAction) =>
					data.movies.find(m => m.id === +route.params.id)
				)
			);
	}
}