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
	img: 'img.jpg',
	tmdb: 1
};

describe('Movie Model', () => {
	let movie: Movie;
	beforeEach(() => {
		movie = new Movie(
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

	describe('buildDetails', () => {
		const info = {
			budget: 10,
			homepage: 'www.homepage.movie',
			overview: 'overview',
			release_date: '1986-10-28',
			revenue: 20
		};
		const contents = {
			results: [
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
		it('should build the details and assign them to the instance', () => {
			expect(movie.details).toBeUndefined();
			movie.buildDetails(info, contents);
			expect(movie.details).toBeDefined();
			expect(movie.details).toEqual({
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
			});
		});
	});
});
