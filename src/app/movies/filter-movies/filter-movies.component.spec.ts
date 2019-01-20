import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterMoviesComponent } from './filter-movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule
} from '@angular/material';
import { MoviesRouterService } from '../movies-router.service';

const mockGetSearchNameParam = jest.fn().mockReturnValue('');
const mockGetSearchGenresParam = jest.fn().mockReturnValue(['']);
const mockAppendSearchNameParam = jest.fn();
const mockAppendSearchGenresParam = jest.fn();
const mockMoviesRouterService = {
	provide: MoviesRouterService,
	useValue: {
		getSearchNameParam: mockGetSearchNameParam,
		getSearchGenresParam: mockGetSearchGenresParam,
		appendSearchNameParam: mockAppendSearchNameParam,
		appendSearchGenresParam: mockAppendSearchGenresParam
	}
};
const providers = [mockMoviesRouterService];
const imports = [
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	MatSelectModule,
	MatInputModule,
	MatFormFieldModule
];
const declarations = [FilterMoviesComponent];

describe('FilterMovies Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(FilterMoviesComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
		componentInstance.genres = ['genre1'];
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
		it('should init the name text', () => {
			expect(componentInstance.nameText.value).toEqual('');
		});

		it('should init the genres select', () => {
			expect(componentInstance.genresSelect.value).toEqual(['']);
		});

		it('should call the getSearchNameParam of moviesRouterService', () => {
			expect(mockGetSearchNameParam).toHaveBeenCalled();
		});

		it('should call the getSearchGenresParam of moviesRouterService', () => {
			expect(mockGetSearchGenresParam).toHaveBeenCalled();
		});
	});

	describe('OnDestroy', () => {
		it('should unsubscribe to nameTextChangesSubscriber', () => {
			const spy = jest.fn();
			componentInstance.nameTextChangesSubscriber = {
				unsubscribe: spy
			};
			componentInstance.ngOnDestroy();
			expect(spy).toHaveBeenCalled();
		});

		it('should unsubscribe to genresChangesSubscriber', () => {
			const spy = jest.fn();
			componentInstance.genresChangesSubscriber = {
				unsubscribe: spy
			};
			componentInstance.ngOnDestroy();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('onChangeSearchName', () => {
		it('should call onChangeSearchGenres', () => {
			componentInstance.nameText.value = 'hello world';
			componentInstance.onChangeSearchName();
			expect(mockAppendSearchNameParam).toHaveBeenCalledWith('hello world');
		});

		it('should call the onChangeSearchName method if the value of searchName changes', async () => {
			const spy = jest.spyOn(componentInstance, 'onChangeSearchName');
			componentInstance.nameText.setValue('hello world');
			componentFixture.detectChanges();
			await componentFixture.whenStable();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('onChangeSearchGenres', () => {
		it('should call onChangeSearchGenres', () => {
			componentInstance.genresSelect.value = 'hello world';
			componentInstance.onChangeSearchGenres();
			expect(mockAppendSearchGenresParam).toHaveBeenCalledWith('hello world');
		});

		it('should call the onChangeSearchGenres method if the value of genresSelect changes', async () => {
			const spy = jest.spyOn(componentInstance, 'onChangeSearchGenres');
			componentInstance.genresSelect.setValue(['hello world']);
			componentFixture.detectChanges();
			await componentFixture.whenStable();
			expect(spy).toHaveBeenCalled();
		});
	});
});
