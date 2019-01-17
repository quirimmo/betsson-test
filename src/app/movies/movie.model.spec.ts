import Movie from './movie.model';
import GenreType from './genre.model';

const rawMovie = {
	id: 1,
	key: 'key',
	name: 'name',
	description: 'description',
	genres: ['action', 'thriller'],
	rate: '8.4',
	length: '1h 23m',
	img: 'img.jpg'
};

describe('Movie Model', () => {
	let movie;
	beforeEach(() => {
		movie = new Movie(
			1,
			'key',
			'name',
			'description',
			[GenreType.Action, GenreType.Thriller],
			'8.4',
			'1h 23m',
			'img.jpg'
		);
	});

	it('should be defined', () => {
		expect(Movie).toBeDefined();
	});

	it('should create an instance', () => {
		expect(movie).toBeInstanceOf(Movie);
	});

	describe('buildInstanceFromRaw', () => {
		it('should build the instance from the raw movie', () => {
			expect(Movie.buildInstanceFromRaw(rawMovie)).toEqual(movie);
		});
	});
});
