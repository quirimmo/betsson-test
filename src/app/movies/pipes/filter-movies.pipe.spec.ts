import { TestBed } from '@angular/core/testing';
import Movie from '../movie.model';
import GenreType from '../genre.model';
import { FilterMoviesPipe } from './filter-movies.pipe';

// create random movie with random genres
const movies: Movie[] = Array.from(new Array(20), (el, ind) => {
	return new Movie(
		ind,
		`key ${ind}`,
		`name ${ind}`,
		`description ${ind}`,
		[
			GenreType[
				Object.keys(GenreType)[Math.floor(Math.random() * Math.floor(11))]
			]
		],
		'10',
		'1h',
		`img-${ind}.jpg`
	);
});
const allGenres = Object.keys(GenreType);
const providers = [FilterMoviesPipe];

describe('FilterMovies Pipe', () => {
	let pipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers
		});
		pipe = TestBed.get(FilterMoviesPipe);
	});

	describe('filter by name', () => {
		it('should return an empty array', () => {
			expect(pipe.transform(movies, 'do not exist', allGenres)).toEqual([]);
		});

		it('should return 11 movies', () => {
			expect(pipe.transform(movies, '1', allGenres)).toHaveLength(11);
		});

		it('should return 2 movies', () => {
			expect(pipe.transform(movies, '2', allGenres)).toHaveLength(2);
		});

		it('should return all the movies', () => {
			expect(pipe.transform(movies, '', allGenres)).toHaveLength(20);
		});
	});

	describe('filter by genres', () => {
		it('should return an empty array', () => {
			expect(pipe.transform(movies, '', [])).toEqual([]);
		});

		it('should filter by all the categories', () => {
			Object.values(GenreType).forEach(forEachGenre);

			function forEachGenre(g: string) {
				const filteredMovies = movies.filter(m => g === m.genres[0]);
				expect(pipe.transform(movies, '', [getEnumKeyByValue(g)])).toHaveLength(
					filteredMovies.length
				);
			}

			function getEnumKeyByValue(key: string) {
				return key.charAt(0).toUpperCase() + key.substr(1);
			}
		});

		it('should return all the movies', () => {
			expect(pipe.transform(movies, '', allGenres)).toHaveLength(20);
		});
	});
});
