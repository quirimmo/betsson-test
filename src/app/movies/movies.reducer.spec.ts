import { moviesReducer } from './movies.reducer';
import GenreType from './genre.model';
import Movie from './movie.model';
import { MoviesActions } from './movies.actions';

const movie = new Movie(
	1,
	'key',
	'name',
	'description',
	[GenreType.Action, GenreType.Thriller],
	'8.4',
	'1h 23m',
	'img.jpg'
);
const movies = [movie];
const fetchAction = {
	type: MoviesActions.FETCH_MOVIES,
	movies
};
const notExistentAction = {
	type: 'NOT_EXISTENT',
	movies
};

describe('Movies Reducer', () => {
	it('should be defined', () => {
		expect(moviesReducer).toBeDefined();
	});

	it('should be a function', () => {
		expect(moviesReducer).toBeInstanceOf(Function);
	});

	it('should return the state', () => {
		expect(moviesReducer(movies, notExistentAction)).toEqual(movies);
	});

	it('should return the new state with the fetched movies', () => {
		expect(moviesReducer([], fetchAction)).toEqual(movies);
	});
});
