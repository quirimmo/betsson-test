import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material';
import { AppNavigatorLinkComponent } from './app-navigator-link.component';
import { MoviesRouterService } from '../movies/movies-router.service';

const mockNavigateBackToMoviesList = jest.fn();
const mockMoviesRouterService = {
	provide: MoviesRouterService,
	useValue: {
		navigateBackToMoviesList: mockNavigateBackToMoviesList
	}
};
const providers = [mockMoviesRouterService];
const imports = [RouterTestingModule, MatIconModule];
const declarations = [AppNavigatorLinkComponent];

describe('AppNavigatorLink Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(AppNavigatorLinkComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
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

	describe('navigateBackToMoviesList', () => {
		it('should call the navigateBackToMoviesList method of movieRouterService', () => {
			componentInstance.navigateBackToMoviesList();
			expect(mockNavigateBackToMoviesList).toHaveBeenCalled();
		});
	});
});
