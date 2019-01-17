import { TestBed } from '@angular/core/testing';
import Movie from '../movies/movie.model';
import GenreType from '../movies/genre.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MoviesDAOService } from './movies.dao';

const rawMovie = {
	id: 1,
	key: 'key',
	name: 'name',
	description: 'description',
	genres: ['action, thriller'],
	rate: '8.4',
	length: '1h 23 m',
	img: 'img.jpg'
};
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
const spyBuildInstanceFromRaw = jest
	.spyOn(Movie, 'buildInstanceFromRaw')
	.mockReturnValue(movie);
const mockGet = jest.fn().mockReturnValue(of([rawMovie]));
const mochHttpClient = {
	provide: HttpClient,
	useValue: {
		get: mockGet
	}
};
const providers = [mochHttpClient, MoviesDAOService];

describe('MovieDAO Service', () => {
	let service;
	beforeEach(() => {
		jest.useFakeTimers();
		TestBed.configureTestingModule({
			providers
		});
		service = TestBed.get(MoviesDAOService);
	});

	it('should call the get method of Httpclient', () => {
		expect(mockGet).toHaveBeenCalledWith('assets/movies.mock-data.json');
	});

	it('should call the buildInstanceFromRaw method of Movie', async () => {
		await service.movies.toPromise();
		expect(spyBuildInstanceFromRaw).toHaveBeenCalledWith(rawMovie);
	});

	describe('fetchMovies', () => {
		it('should return the list of movies', async () => {
			const returnedMovies = await service.movies.toPromise();
			expect(returnedMovies).toEqual(movies);
		});
	});
});
