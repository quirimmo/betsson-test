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
	'img.jpg',
	1
);
const movieWithDetails = new Movie(
	1,
	'key',
	'name',
	'description',
	[GenreType.Action, GenreType.Thriller],
	'8.4',
	'1h 23m',
	'img.jpg',
	1
);
movieWithDetails.details = {
	budget: 10,
	homepage: 'www.homepage.movie',
	overview: 'overview',
	releaseDate: new Date('1986-10-28'),
	revenue: 20,
	videos: [
		{
			id: 1,
			key: 'key 1',
			name: 'name 1',
			site: 'youtube',
			type: 'trailer'
		},
		{
			id: 1,
			key: 'key 1',
			name: 'name 1',
			site: 'youtube',
			type: 'trailer'
		}
	]
};
const movies = [movie];
const fetchAction = {
	type: MoviesActions.FETCH_MOVIES,
	movies
};
const fetchDetailsAction = {
	type: MoviesActions.FETCH_MOVIE_DETAILS,
	movie: movieWithDetails
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

	it('should return the new state with the details fetched in the movie', () => {
		expect(moviesReducer(movies, fetchDetailsAction)).toEqual([
			movieWithDetails
		]);
	});
});
