import { Injectable } from '@angular/core';
import { Action, Dispatch, AnyAction } from 'redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/store.model';
import Movie from './movie.model';
import { MoviesDAOService } from './movies.dao';

export interface MoviesAction extends Action {
	movies?: Movie[];
}

@Injectable()
export class MoviesActions {
	static readonly FETCH_MOVIES = 'FETCH_MOVIES';

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
}
