import { TestBed } from '@angular/core/testing';
import Movie from '../movies/movie.model';
import GenreType from '../movies/genre.model';
import { of } from 'rxjs';
import { MoviesDAOService } from './movies.dao';
import { MoviesActions } from './movies.actions';
import { NgRedux } from '@angular-redux/store';

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
const mockFetchMovies = jest.fn().mockReturnValue(of(movies));
const mockMoviesDAOService = {
	provide: MoviesDAOService,
	useValue: {
		fetchMovies: mockFetchMovies
	}
};
const mockDispatch = jest.fn();
const mockNgRedux = {
	provide: NgRedux,
	useValue: {
		dispatch: mockDispatch
	}
};
const providers = [mockNgRedux, mockMoviesDAOService, MoviesActions];

describe('MoviesActions Service', () => {
	let service;
	beforeEach(() => {
		jest.useFakeTimers();
		TestBed.configureTestingModule({
			providers
		});
		service = TestBed.get(MoviesActions);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('Action Types', () => {
		it('should define the FETCH_MOVIES action type', () => {
			expect(MoviesActions.FETCH_MOVIES).toEqual('FETCH_MOVIES');
		});
	});

	describe('fetchMovies', () => {
		let fetchedMovies;
		beforeEach(async () => {
			fetchedMovies = await service.fetchMovies().toPromise();
		});
		it('should call the fetchMovies method of MoviesDAOService', () => {
			expect(mockFetchMovies).toHaveBeenCalled();
		});

		it('should dispatch the action to redux', () => {
			expect(mockDispatch).toHaveBeenCalledWith({
				type: MoviesActions.FETCH_MOVIES,
				movies
			});
		});

		it('should return the list of fetched movies', () => {
			expect(fetchedMovies).toEqual(movies);
		});
	});
});
