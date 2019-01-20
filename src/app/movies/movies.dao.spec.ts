import { TestBed } from '@angular/core/testing';
import Movie from '../movies/movie.model';
import GenreType from '../movies/genre.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const rawMovie = {
	id: 1,
	key: 'key',
	name: 'name',
	description: 'description',
	genres: ['action', 'thriller'],
	rate: '8.4',
	length: '1h 23m',
	img: 'img.jpg',
	tmdb: 1
};
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
const mockBuildInstanceFromRaw = jest.fn().mockReturnValue(movie);
Movie.buildInstanceFromRaw = mockBuildInstanceFromRaw.bind(Movie);

const mockGet = jest.fn().mockReturnValue(of([rawMovie]));
const mochHttpClient = {
	provide: HttpClient,
	useValue: {
		get: mockGet
	}
};

import {
	MoviesDAOService,
	LOCAL_DATA,
	TMDB_API_BASE_URL,
	TMDB_API_MOVIE_ENDPOINT,
	TMDB_API_MOVIE_ENDPOINT_URL,
	TMDB_API_VIDEOS_ENDPOINT,
	TMDB_API_KEY,
	TMDB_API_KEY_QUERY_PARAM
} from './movies.dao';
const providers = [mochHttpClient, MoviesDAOService];

describe('MovieDAO Service', () => {
	let service: MoviesDAOService;
	beforeEach(() => {
		jest.useFakeTimers();
		TestBed.configureTestingModule({
			providers
		});
		service = TestBed.get(MoviesDAOService);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('constructor', () => {
		it('should call the get method of Httpclient', () => {
			expect(mockGet).toHaveBeenCalledWith('assets/movies.mock-data.json');
		});

		it('should call the buildInstanceFromRaw method of Movie', async () => {
			await service.movies.toPromise();
			expect(mockBuildInstanceFromRaw).toHaveBeenCalledWith(rawMovie);
		});
	});

	describe('fetchMovies', () => {
		it('should return the list of movies', async () => {
			const returnedMovies = await service.movies.toPromise();
			expect(returnedMovies).toEqual(movies);
		});
	});

	describe('constants', () => {
		it('should define the LOCAL_DATA', () => {
			expect(LOCAL_DATA).toEqual('assets/movies.mock-data.json');
		});

		it('should define the TMDB_API_BASE_URL', () => {
			expect(TMDB_API_BASE_URL).toEqual('https://api.themoviedb.org/3/');
		});

		it('should define the TMDB_API_MOVIE_ENDPOINT', () => {
			expect(TMDB_API_MOVIE_ENDPOINT).toEqual('movie');
		});

		it('should define the TMDB_API_MOVIE_ENDPOINT_URL', () => {
			expect(TMDB_API_MOVIE_ENDPOINT_URL).toEqual(
				'https://api.themoviedb.org/3/movie'
			);
		});

		it('should define the TMDB_API_VIDEOS_ENDPOINT', () => {
			expect(TMDB_API_VIDEOS_ENDPOINT).toEqual('videos');
		});

		it('should define the TMDB_API_KEY', () => {
			expect(TMDB_API_KEY).toEqual('53dac0ef884884dfee672ca40713c063');
		});

		it('should define the TMDB_API_KEY_QUERY_PARAM', () => {
			expect(TMDB_API_KEY_QUERY_PARAM).toEqual(
				'api_key=53dac0ef884884dfee672ca40713c063'
			);
		});
	});

	describe('getDetailsRequests', () => {
		it('should return the two requests', () => {
			expect(service.getDetailsRequests(1)).toHaveLength(2);
		});

		it('should build the two http get requests', () => {
			service.getDetailsRequests(1);
			expect(mockGet).toHaveBeenNthCalledWith(
				2,
				`https://api.themoviedb.org/3/movie/1?api_key=53dac0ef884884dfee672ca40713c063`
			);
			expect(mockGet).toHaveBeenNthCalledWith(
				3,
				`https://api.themoviedb.org/3/movie/1/videos?api_key=53dac0ef884884dfee672ca40713c063`
			);
			expect(service.getDetailsRequests(1)).toHaveLength(2);
		});
	});

	describe('fetchMovieDetails', () => {
		it('should call the getDetailsRequest method', () => {
			const spy = jest.spyOn(service, 'getDetailsRequests');
			service.fetchMovieDetails(movie);
			expect(spy).toHaveBeenCalledWith(1);
		});

		it('should call the buildDetails method of movie', async () => {
			jest.spyOn(service, 'getDetailsRequests').mockReturnValue(of([{}, {}]));
			const spy = jest
				.spyOn(movie, 'buildDetails')
				.mockImplementation(() => movie);
			await service.fetchMovieDetails(movie).toPromise();
			expect(spy).toHaveBeenCalledWith([{}, {}], undefined);
		});
	});
});
