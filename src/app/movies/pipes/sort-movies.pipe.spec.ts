import { TestBed } from '@angular/core/testing';
import { SortMoviesPipe } from './sort-movies.pipe';
import Movie from '../movie.model';

const providers = [SortMoviesPipe];

describe('SortMovies Pipe', () => {
	let pipe: SortMoviesPipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers
		});
		pipe = TestBed.get(SortMoviesPipe);
	});

	describe('transform', () => {
		describe('id', () => {
			const movie1 = new Movie(1, '', '', '', [], '', '', '');
			const movie2 = new Movie(2, '', '', '', [], '', '', '');

			it('should return the sorted movies by id in ascending order', () => {
				expect(
					pipe.transform([movie1, movie2], { value: 'id', isAscending: true })
				).toEqual([movie1, movie2]);
			});

			it('should return the sorted movies by id in descending order', () => {
				expect(
					pipe.transform([movie1, movie2], { value: 'id', isAscending: false })
				).toEqual([movie2, movie1]);
			});
		});

		describe('name', () => {
			const movie1 = new Movie(1, '', 'a', '', [], '', '', '');
			const movie2 = new Movie(2, '', 'B', '', [], '', '', '');

			it('should return the sorted movies by name in ascending order', () => {
				expect(
					pipe.transform([movie1, movie2], { value: 'name', isAscending: true })
				).toEqual([movie1, movie2]);
			});

			it('should return the sorted movies by name in descending order', () => {
				expect(
					pipe.transform([movie1, movie2], {
						value: 'name',
						isAscending: false
					})
				).toEqual([movie2, movie1]);
			});
		});

		describe('rate', () => {
			const movie1 = new Movie(1, '', '', '', [], '1', '', '');
			const movie2 = new Movie(2, '', '', '', [], '2', '', '');

			it('should return the sorted movies by rate in ascending order', () => {
				expect(
					pipe.transform([movie1, movie2], { value: 'rate', isAscending: true })
				).toEqual([movie1, movie2]);
			});

			it('should return the sorted movies by rate in descending order', () => {
				expect(
					pipe.transform([movie1, movie2], {
						value: 'rate',
						isAscending: false
					})
				).toEqual([movie2, movie1]);
			});
		});

		describe('length', () => {
			const movie1 = new Movie(1, '', '', '', [], '', '1hrs 10mins', '');
			const movie2 = new Movie(2, '', '', '', [], '', '1hrs 20mins', '');
			const movie3 = new Movie(3, '', '', '', [], '', '2hrs 10mins', '');
			const movie4 = new Movie(4, '', '', '', [], '', '3hrs 10mins', '');

			it('should return the sorted movies by duration in ascending order', () => {
				expect(
					pipe.transform([movie1, movie2, movie3, movie4], {
						value: 'length',
						isAscending: true
					})
				).toEqual([movie1, movie2, movie3, movie4]);
			});

			it('should return the sorted movies by duration in descending order', () => {
				expect(
					pipe.transform([movie1, movie2, movie3, movie4], {
						value: 'length',
						isAscending: false
					})
				).toEqual([movie4, movie3, movie2, movie1]);
			});
		});
	});

	describe('sortById', () => {
		const movie1 = new Movie(1, '', '', '', [], '', '', '');
		const movie2 = new Movie(2, '', '', '', [], '', '', '');

		it('should sort the given movies by id in ascending order', () => {
			expect(pipe.sortById(true)(movie1, movie2)).toEqual(-1);
			expect(pipe.sortById(true)(movie2, movie1)).toEqual(1);
		});

		it('should sort the given movies by id in descending order', () => {
			expect(pipe.sortById(false)(movie1, movie2)).toEqual(1);
			expect(pipe.sortById(false)(movie2, movie1)).toEqual(-1);
		});
	});

	describe('sortByName', () => {
		const movie1 = new Movie(1, '', 'a', '', [], '', '', '');
		const movie2 = new Movie(2, '', 'B', '', [], '', '', '');

		it('should sort the given movies by name in ascending order', () => {
			expect(pipe.sortById(true)(movie1, movie2)).toEqual(-1);
			expect(pipe.sortById(true)(movie2, movie1)).toEqual(1);
		});

		it('should sort the given movies by name in descending order', () => {
			expect(pipe.sortById(false)(movie1, movie2)).toEqual(1);
			expect(pipe.sortById(false)(movie2, movie1)).toEqual(-1);
		});
	});

	describe('sortByRate', () => {
		const movie1 = new Movie(1, '', '', '', [], '1', '', '');
		const movie2 = new Movie(2, '', '', '', [], '2', '', '');

		it('should sort the given movies by rate in ascending order', () => {
			expect(pipe.sortById(true)(movie1, movie2)).toEqual(-1);
			expect(pipe.sortById(true)(movie2, movie1)).toEqual(1);
		});

		it('should sort the given movies by rate in descending order', () => {
			expect(pipe.sortById(false)(movie1, movie2)).toEqual(1);
			expect(pipe.sortById(false)(movie2, movie1)).toEqual(-1);
		});
	});

	describe('sortByDuration', () => {
		const movie1 = new Movie(1, '', '', '', [], '', '1hrs 10mins', '');
		const movie2 = new Movie(2, '', '', '', [], '', '1hrs 20mins', '');
		const movie3 = new Movie(3, '', '', '', [], '', '2hrs 10mins', '');
		const movie4 = new Movie(4, '', '', '', [], '', '3hrs 10mins', '');

		it('should sort the given movies by duration in ascending order', () => {
			expect(pipe.sortById(true)(movie1, movie2)).toEqual(-1);
			expect(pipe.sortById(true)(movie2, movie1)).toEqual(1);
			expect(pipe.sortById(true)(movie3, movie4)).toEqual(-1);
			expect(pipe.sortById(true)(movie4, movie3)).toEqual(1);
		});

		it('should sort the given movies by duration in descending order', () => {
			expect(pipe.sortById(false)(movie1, movie2)).toEqual(1);
			expect(pipe.sortById(false)(movie2, movie1)).toEqual(-1);
			expect(pipe.sortById(false)(movie3, movie4)).toEqual(1);
			expect(pipe.sortById(false)(movie4, movie3)).toEqual(-1);
		});
	});

	describe('getHoursAndMinutesFromDuration', () => {
		it('should return 1 and 20', () => {
			expect(pipe.getHoursAndMinutesFromDuration('1hrs 20mins')).toEqual([
				1,
				20
			]);
		});

		it('should return 12 and 49', () => {
			expect(pipe.getHoursAndMinutesFromDuration('12hrs 49mins')).toEqual([
				12,
				49
			]);
		});
	});
});
