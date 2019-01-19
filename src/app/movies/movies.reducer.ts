import Movie from './movie.model';
import { MoviesActions, MoviesAction } from './movies.actions';

export function moviesReducer(
	state: Movie[] = [],
	action: MoviesAction
): Movie[] {
	switch (action.type) {
		case MoviesActions.FETCH_MOVIES:
			return [].concat(...action.movies);
		case MoviesActions.FETCH_MOVIE_DETAILS:
			return state.map((movie: Movie) =>
				movie.id === action.movie.id ? action.movie : movie
			);
		default:
			return state;
	}
}
