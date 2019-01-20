import { TestBed } from '@angular/core/testing';
import { MoviesRouterService } from './movies-router.service';
import { ActivatedRoute, Router } from '@angular/router';

const mockActivatedRoute = {
	provide: ActivatedRoute,
	useValue: {
		snapshot: {
			queryParams: {
				name: 'name value',
				genres: ['genre1', 'genre2'],
				sortBy: 'name',
				isAscending: false
			}
		}
	}
};
const mockNavigate = jest.fn().mockImplementation(() => {});
const mockRouter = {
	provide: Router,
	useValue: {
		navigate: mockNavigate
	}
};
const providers = [mockActivatedRoute, mockRouter, MoviesRouterService];

describe('MoviesRouter Service', () => {
	let service: MoviesRouterService;
	beforeEach(() => {
		jest.useFakeTimers();
		TestBed.configureTestingModule({
			providers
		});
		service = TestBed.get(MoviesRouterService);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should init the moviesListRouteParams', () => {
		expect(service.moviesListRouteParams).toEqual({
			genres: null,
			name: null,
			sortBy: null,
			isAscending: null
		});
	});

	describe('appendSearchNameParam', () => {
		it('should call the appendQueryParam with the given value', () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockImplementation(() => {});
			service.appendSearchNameParam('hello world');
			expect(spy).toHaveBeenCalledWith('name', 'hello world');
		});

		it('should call the appendQueryParam with the null', () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockImplementation(() => {});
			service.appendSearchNameParam('');
			expect(spy).toHaveBeenCalledWith('name', null);
		});
	});

	describe('getSearchNameParam', () => {
		it('should return the name query param', () => {
			expect(service.getSearchNameParam()).toEqual('name value');
		});
	});

	describe('appendSearchGenresParam', () => {
		it('should call the appendQueryParam with the provided value', () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockImplementation(() => {});
			service.appendSearchGenresParam(['param1']);
			expect(spy).toHaveBeenCalledWith('genres', ['param1']);
		});

		it('should call the appendQueryParam with null', () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockImplementation(() => {});
			service.appendSearchGenresParam([]);
			expect(spy).toHaveBeenCalledWith('genres', null);
		});
	});

	describe('getSearchGenresParam', () => {
		it('should return an empty array', () => {
			service.route.snapshot.queryParams.genres = undefined;
			expect(service.getSearchGenresParam()).toEqual([]);
		});

		it('should return an array with the single genre', () => {
			service.route.snapshot.queryParams.genres = 'genre';
			expect(service.getSearchGenresParam()).toEqual(['genre']);
		});

		it('should return the genres', () => {
			expect(service.getSearchGenresParam()).toEqual(['genre1', 'genre2']);
		});
	});

	describe('getSortByParam', () => {
		it('should return the object with the sortBy value and the isAscending value', () => {
			expect(service.getSortByParam()).toEqual({
				sortBy: 'name',
				isAscending: false
			});
		});

		it('should return the object with the sortBy value and the isAscending as null', () => {
			service.route.snapshot.queryParams.isAscending = undefined;
			expect(service.getSortByParam()).toEqual({
				sortBy: 'name',
				isAscending: null
			});
		});

		it('should return the object with the sortBy as null and the isAscending value', () => {
			service.route.snapshot.queryParams.sortBy = undefined;
			expect(service.getSortByParam()).toEqual({
				sortBy: null,
				isAscending: false
			});
		});
	});

	describe('appendSortByParam', () => {
		it('should call appendQueryParam twice with the given sortBy value and isAscending value', async () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockResolvedValue(true);
			await service.appendSortByParam('name', false);
			expect(spy).toHaveBeenNthCalledWith(1, 'sortBy', 'name');
			expect(spy).toHaveBeenNthCalledWith(2, 'isAscending', false);
		});

		it('should call appendQueryParam twice with the sortBy as null and isAscending value', async () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockResolvedValue(true);
			await service.appendSortByParam('', false);
			expect(spy).toHaveBeenNthCalledWith(1, 'sortBy', null);
			expect(spy).toHaveBeenNthCalledWith(2, 'isAscending', false);
		});

		it('should call appendQueryParam twice with the given sortBy value and isAscending as null', async () => {
			const spy = jest
				.spyOn(service, 'appendQueryParam')
				.mockResolvedValue(true);
			await service.appendSortByParam('name', undefined);
			expect(spy).toHaveBeenNthCalledWith(1, 'sortBy', 'name');
			expect(spy).toHaveBeenNthCalledWith(2, 'isAscending', null);
		});
	});

	describe('appendQueryParam', () => {
		it('should call the navigate of router', () => {
			service.appendQueryParam('queryParam', 'queryParamValue');
			expect(mockNavigate).toHaveBeenCalledWith([], {
				relativeTo: service.route,
				queryParams: {
					queryParam: 'queryParamValue'
				},
				queryParamsHandling: 'merge'
			});
		});
	});

	describe('navigateBackToMoviesList', () => {
		it('should call the navigate of router with the current moviesListRouteParams', () => {
			service.moviesListRouteParams = {
				genres: 'genres value',
				name: 'name value',
				sortBy: 'sort by value',
				isAscending: 'is ascending value'
			};
			service.navigateBackToMoviesList();
			expect(mockNavigate).toHaveBeenCalledWith([''], {
				queryParams: {
					genres: 'genres value',
					name: 'name value',
					sortBy: 'sort by value',
					isAscending: 'is ascending value'
				}
			});
		});
	});
});
