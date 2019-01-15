import Movie from './movie.model';
import { MoviesActions, MoviesAction } from './movies.actions';

export function moviesReducer(
	state: Movie[] = [],
	action: MoviesAction
): Movie[] {
	switch (action.type) {
		case MoviesActions.FETCH_MOVIES:
			return [].concat(...action.movies);
		default:
			return state;
	}
}
