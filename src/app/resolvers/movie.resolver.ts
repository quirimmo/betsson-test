import { Injectable } from '@angular/core';
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesActions } from '../movies/movies.actions';
import Movie from '../movies/movie.model';
import { map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class MovieResolver implements Resolve<Movie> {
	constructor(private actions: MoviesActions) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Movie> {
		return this.actions
			.fetchMovies()
			.pipe(map(findMovie))
			.pipe(exhaustMap(getMovieDetails.bind(this)));

		function findMovie(movies: Movie[]): Movie {
			return movies.find(({ id }) => id === +route.params.id);
		}

		function getMovieDetails(movie: Movie): Observable<Movie> {
			return this.actions.fetchMovieDetails(movie);
		}
	}
}
