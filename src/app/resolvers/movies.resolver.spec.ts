import { TestBed } from '@angular/core/testing';
import { MoviesActions } from '../movies/movies.actions';
import { of } from 'rxjs';
import Movie from '../movies/movie.model';
import GenreType from '../movies/genre.model';
import { MoviesResolver } from './movies.resolver';

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
const mockDispatchFetchMoviesThunk = jest.fn().mockReturnValue(of({ movies }));
const mockMoviesActions = {
	provide: MoviesActions,
	useValue: {
		dispatchFetchMoviesThunk: mockDispatchFetchMoviesThunk
	}
};
const providers = [mockMoviesActions, MoviesResolver];

describe('Movies Resolver', () => {
	let resolver;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers
		});
		resolver = TestBed.get(MoviesResolver);
	});

	it('should dispatch the action dispatchFetchMoviesThunk', () => {
		resolver.resolve();
		expect(mockDispatchFetchMoviesThunk).toHaveBeenCalled();
	});

	it('should resolve the list of movies', async () => {
		const resolvedMovies = await resolver.resolve().toPromise();
		expect(resolvedMovies).toEqual(movies);
	});
});
