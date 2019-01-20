import { TestBed, async } from '@angular/core/testing';
import Movie from 'src/app/movies/movie.model';
import { FilterMoviesPipe } from 'src/app/movies/pipes/filter-movies.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesListComponent } from 'src/app/movies/movies-list/movies-list.component';
import { FilterMoviesComponent } from '../filter-movies/filter-movies.component';
import { RouterTestingModule } from '@angular/router/testing';
import GenreType from '../genre.model';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';
import { SortMoviesComponent } from '../sort-movies/sort-movies.component';
import { SortMoviesPipe } from '../pipes/sort-movies.pipe';
import { By } from '@angular/platform-browser';

const movie = new Movie(
	1,
	'key',
	'name',
	'description',
	[GenreType.Action],
	'8.4',
	'1h 23m',
	'img.jpg'
);
const movies = [movie];
const mockTransform = jest.fn().mockReturnValue(movies);
const mockFilterMoviesPipe = {
	provide: FilterMoviesPipe,
	useValue: {
		transform: mockTransform
	}
};
const mockTransformSortPipe = jest.fn().mockReturnValue(movies);
const mockSortMoviesPipe = {
	provide: SortMoviesPipe,
	useValue: {
		transform: mockTransformSortPipe
	}
};
const providers = [mockFilterMoviesPipe, mockSortMoviesPipe];
const imports = [RouterTestingModule, BrowserAnimationsModule];
const declarations = [
	FilterMoviesComponent,
	SortMoviesComponent,
	SortMoviesPipe,
	MovieListItemComponent,
	MoviesListComponent
];

const MockFilterMoviesComponent = {
	set: {
		inputs: ['genres'],
		template: '<span>filter movies</span>'
	}
};
const MockSortMoviesComponent = {
	set: {
		template: '<span>sort movies</span>'
	}
};
const MockMovieListItemComponent = {
	set: {
		inputs: ['movie'],
		template: '<span>movie list item</span>'
	}
};

describe('MoviesList Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		})
			.overrideComponent(FilterMoviesComponent, MockFilterMoviesComponent)
			.overrideComponent(SortMoviesComponent, MockSortMoviesComponent)
			.overrideComponent(MovieListItemComponent, MockMovieListItemComponent)
			.compileComponents();
		componentFixture = TestBed.createComponent(MoviesListComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
		componentInstance.movies = movies;
	}));
	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});

	describe('trackById', () => {
		it('should return the id of the movie', () => {
			expect(componentInstance.trackById(0, movie)).toEqual(1);
		});
	});

	describe('getFilteredMovies', () => {
		it('should call the transform method of the FilterMoviesPipe', () => {
			componentInstance.getFilteredMovies('', []);
			expect(mockTransform).toHaveBeenCalledWith(movies, '', []);
		});
	});

	describe('isNoMoviesMessageVisible', () => {
		it('should return false', () => {
			jest.spyOn(componentInstance, 'isMoviesListEmpty').mockReturnValue(true);
			jest
				.spyOn(componentInstance, 'isSearchNotPristine')
				.mockReturnValue(false);
			expect(componentInstance.isNoMoviesMessageVisible({}, {})).toBeFalsy();
		});

		it('should return false', () => {
			jest.spyOn(componentInstance, 'isMoviesListEmpty').mockReturnValue(false);
			jest
				.spyOn(componentInstance, 'isSearchNotPristine')
				.mockReturnValue(true);
			expect(componentInstance.isNoMoviesMessageVisible({}, {})).toBeFalsy();
		});

		it('should return false', () => {
			jest.spyOn(componentInstance, 'isMoviesListEmpty').mockReturnValue(false);
			jest
				.spyOn(componentInstance, 'isSearchNotPristine')
				.mockReturnValue(false);
			expect(componentInstance.isNoMoviesMessageVisible({}, {})).toBeFalsy();
		});

		it('should return true', () => {
			jest.spyOn(componentInstance, 'isMoviesListEmpty').mockReturnValue(true);
			jest
				.spyOn(componentInstance, 'isSearchNotPristine')
				.mockReturnValue(true);
			expect(componentInstance.isNoMoviesMessageVisible({}, {})).toBeTruthy();
		});
	});

	describe('isMoviesListEmpty', () => {
		it('should return true', () => {
			jest.spyOn(componentInstance, 'getFilteredMovies').mockReturnValue([]);
			expect(componentInstance.isMoviesListEmpty()).toBeTruthy();
		});

		it('should return false', () => {
			jest
				.spyOn(componentInstance, 'getFilteredMovies')
				.mockReturnValue(['blablabla']);
			expect(componentInstance.isMoviesListEmpty()).toBeFalsy();
		});
	});

	describe('isSearchNotPristine', () => {
		it('should return false', () => {
			expect(
				componentInstance.isSearchNotPristine(
					{ pristine: true },
					{ pristine: true }
				)
			).toBeFalsy();
		});

		it('should return true', () => {
			expect(
				componentInstance.isSearchNotPristine(
					{ pristine: false },
					{ pristine: false }
				)
			).toBeTruthy();
		});

		it('should return true', () => {
			expect(
				componentInstance.isSearchNotPristine(
					{ pristine: true },
					{ pristine: false }
				)
			).toBeTruthy();
		});

		it('should return true', () => {
			expect(
				componentInstance.isSearchNotPristine(
					{ pristine: false },
					{ pristine: true }
				)
			).toBeTruthy();
		});
	});
});
