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
const mockFetchMovies = jest.fn().mockReturnValue(of(movies));
const mockFetchMovieDetails = jest.fn().mockReturnValue(of(movieWithDetails));
const mockMoviesDAOService = {
	provide: MoviesDAOService,
	useValue: {
		fetchMovies: mockFetchMovies,
		fetchMovieDetails: mockFetchMovieDetails
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
	let service: MoviesActions;
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

		it('should define the FETCH_MOVIE_DETAILS action type', () => {
			expect(MoviesActions.FETCH_MOVIE_DETAILS).toEqual('FETCH_MOVIE_DETAILS');
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

	describe('fetchMovies', () => {
		it('should not call the fetchMovieDetails of moviesDAO if the movie already has details', () => {
			service.fetchMovieDetails(movieWithDetails);
			expect(mockFetchMovieDetails).not.toHaveBeenCalled();
		});

		it('should return an observable with the given movie if the movie already has details', async () => {
			const returnedMovie = await service
				.fetchMovieDetails(movieWithDetails)
				.toPromise();
			expect(returnedMovie).toEqual(returnedMovie);
		});

		it('should call the fetchMovieDetails of moviesDAO if the movie has not details yet', () => {
			service.fetchMovieDetails(movie);
			expect(mockFetchMovieDetails).toHaveBeenCalledWith(movie);
		});

		it('should dispatch the action to redux if the movie has not details yet', async () => {
			const returnedMovie = await service.fetchMovieDetails(movie).toPromise();
			expect(mockDispatch).toHaveBeenCalledWith({
				type: MoviesActions.FETCH_MOVIE_DETAILS,
				movie: returnedMovie
			});
		});

		it('should return an observable with the movie fetched with details the movie has not details yet', async () => {
			const returnedMovie = await service.fetchMovieDetails(movie).toPromise();
			expect(returnedMovie).toEqual(movieWithDetails);
		});
	});
});
