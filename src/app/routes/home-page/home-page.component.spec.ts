import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from './home-page.component';
import { AppLoaderActions } from 'src/app/app-loader/app-loader.actions';
import { ActivatedRoute } from '@angular/router';
import Movie from 'src/app/movies/movie.model';
import { FilterMoviesPipe } from 'src/app/movies/pipes/filter-movies.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesListComponent } from 'src/app/movies/movies-list/movies-list.component';

const mockStopLoading = jest.fn();
const mockAppLoaderActions = {
	provide: AppLoaderActions,
	useValue: {
		stopLoading: mockStopLoading
	}
};
const mockActivatedRoute = {
	provide: ActivatedRoute,
	useValue: {
		snapshot: {
			data: { movies: ['movie 1'] }
		}
	}
};
const mockFilterMoviesPipe = {
	provide: FilterMoviesPipe,
	useValue: {
		transform: (movies: Movie[]) => movies
	}
};
const providers = [
	mockAppLoaderActions,
	mockActivatedRoute,
	mockFilterMoviesPipe
];
const imports = [RouterTestingModule, BrowserAnimationsModule];
const declarations = [HomePageComponent, MoviesListComponent];

const MockMoviesListComponent = {
	set: {
		inputs: ['movies'],
		template: '<span>movies list</span>'
	}
};

describe('HomePage Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		})
			.overrideComponent(MoviesListComponent, MockMoviesListComponent)
			.compileComponents();
		componentFixture = TestBed.createComponent(HomePageComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
	}));

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});

	describe('OnInit', () => {
		beforeEach(async () => {
			componentFixture.detectChanges();
			await componentFixture.whenStable();
		});
		it('should init the movies', () => {
			expect(componentInstance.movies).toEqual(['movie 1']);
		});

		it('should dispatch the stopLoading action', () => {
			expect(mockStopLoading).toHaveBeenCalled();
		});
	});
});
