import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/store.model';
import Movie from './movie.model';
import { MoviesDAOService } from './movies.dao';

export interface MoviesAction extends Action {
	movies?: Movie[];
	movie?: Movie;
}

@Injectable()
export class MoviesActions {
	static readonly FETCH_MOVIES = 'FETCH_MOVIES';
	static readonly FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';

	constructor(
		private ngRedux: NgRedux<StoreModel>,
		private moviesDAO: MoviesDAOService
	) {}

	public fetchMovies(): Observable<Movie[]> {
		return this.moviesDAO.fetchMovies().pipe(map(onMap.bind(this)));

		function onMap(movies: Movie[]): Movie[] {
			this.ngRedux.dispatch({
				type: MoviesActions.FETCH_MOVIES,
				movies
			});
			return movies;
		}
	}

	public fetchMovieDetails(movie: Movie): Observable<Movie> {
		if (movie.details) {
			return of(movie);
		}
		return this.moviesDAO.fetchMovieDetails(movie).pipe(map(onMap.bind(this)));

		function onMap(movieWithDetails: Movie): Movie {
			this.ngRedux.dispatch({
				type: MoviesActions.FETCH_MOVIE_DETAILS,
				movie: movieWithDetails
			});
			return movieWithDetails;
		}
	}
}
