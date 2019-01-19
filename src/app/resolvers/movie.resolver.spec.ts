import { MovieResolver } from './movie.resolver';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { MoviesActions } from '../movies/movies.actions';
import { of } from 'rxjs';
import Movie from '../movies/movie.model';
import GenreType from '../movies/genre.model';

const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
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
const movies = [movie];
const mockFetchMovies = jest.fn().mockReturnValue(of(movies));
const mockFetchMovieDetails = jest.fn().mockReturnValue(of(movie));
const mockMoviesActions = {
	provide: MoviesActions,
	useValue: {
		fetchMovies: mockFetchMovies,
		fetchMovieDetails: mockFetchMovieDetails
	}
};
const providers = [mockMoviesActions, MovieResolver];

describe('Movie Resolver', () => {
	let resolver;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers
		});
		resolver = TestBed.get(MovieResolver);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should dispatch the action fetchMovies', () => {
		resolver.resolve(route);
		expect(mockFetchMovies).toHaveBeenCalled();
	});

	it('should resolve the corresponding movie', async () => {
		route.params = { id: 1 };
		const resolvedMovie = await resolver.resolve(route).toPromise();
		expect(resolvedMovie).toEqual(movie);
	});

	it('should dispatch the action fetchMovieDetails', async () => {
		route.params = { id: 1 };
		const resolvedMovie = await resolver.resolve(route).toPromise();
		expect(mockFetchMovieDetails).toHaveBeenCalledWith(resolvedMovie);
	});

	it('should return undefined if there is not the corresponding movie', async () => {
		mockFetchMovieDetails.mockReturnValue(of(undefined));
		route.params = { id: 2 };
		const resolvedMovie = await resolver.resolve(route).toPromise();
		expect(resolvedMovie).toBeUndefined();
	});
});
