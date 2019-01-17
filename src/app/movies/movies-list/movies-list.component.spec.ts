import { TestBed, async } from '@angular/core/testing';
import Movie from 'src/app/movies/movie.model';
import { FilterMoviesPipe } from 'src/app/movies/pipes/filter-movies.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesListComponent } from 'src/app/movies/movies-list/movies-list.component';
import { FilterMoviesComponent } from '../filter-movies/filter-movies.component';
import { RouterTestingModule } from '@angular/router/testing';
import GenreType from '../genre.model';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';

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
const providers = [mockFilterMoviesPipe];
const imports = [RouterTestingModule, BrowserAnimationsModule];
const declarations = [
	FilterMoviesComponent,
	MovieListItemComponent,
	MoviesListComponent
];

const MockFilterMoviesComponent = {
	set: {
		inputs: ['genres'],
		template: '<span>filter movies</span>'
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
			.overrideComponent(MovieListItemComponent, MockMovieListItemComponent)
			.compileComponents();
		componentFixture = TestBed.createComponent(MoviesListComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
		componentInstance.movies = movies;
	}));

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
});
