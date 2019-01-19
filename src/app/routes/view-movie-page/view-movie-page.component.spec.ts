import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppLoaderActions } from 'src/app/app-loader/app-loader.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewMoviePageComponent } from './view-movie-page.component';
import { MovieDetailsComponent } from 'src/app/movies/movie-details/movie-details.component';
import { AppNavigatorLinkComponent } from 'src/app/app-navigator-link/app-navigator-link.component';

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
			data: { movie: 'movie 1' }
		}
	}
};
const mockNavigate = jest.fn();
const mockRouter = {
	provide: Router,
	useValue: {
		navigate: mockNavigate
	}
};
const providers = [mockAppLoaderActions, mockActivatedRoute, mockRouter];
const imports = [RouterTestingModule];
const declarations = [
	ViewMoviePageComponent,
	MovieDetailsComponent,
	AppNavigatorLinkComponent
];

const MockMovieDetailsComponent = {
	set: {
		inputs: ['movie'],
		template: '<span>movie details</span>'
	}
};
const MockAppNavigatorLinkComponent = {
	set: {
		template: '<span>app navigator link</span>'
	}
};

describe('ViewMoviePage Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		})
			.overrideComponent(
				AppNavigatorLinkComponent,
				MockAppNavigatorLinkComponent
			)
			.overrideComponent(MovieDetailsComponent, MockMovieDetailsComponent)
			.compileComponents();
		componentFixture = TestBed.createComponent(ViewMoviePageComponent);
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
		it('should init the movie', () => {
			expect(componentInstance.movie).toEqual('movie 1');
		});

		it('should dispatch the stopLoading action', () => {
			expect(mockStopLoading).toHaveBeenCalled();
		});
	});
});
