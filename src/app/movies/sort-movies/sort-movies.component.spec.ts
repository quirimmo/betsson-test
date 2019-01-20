import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortMoviesComponent } from './sort-movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MoviesRouterService } from '../movies-router.service';

const mockGetSortByParam = jest
	.fn()
	.mockReturnValue({ sortBy: 'name', isAscending: false });
const mockAppendSortByParam = jest.fn();
const mockMoviesRouterService = {
	provide: MoviesRouterService,
	useValue: {
		getSortByParam: mockGetSortByParam,
		appendSortByParam: mockAppendSortByParam
	}
};
const providers = [mockMoviesRouterService];
const imports = [
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	MatSelectModule,
	MatFormFieldModule
];
const declarations = [SortMoviesComponent];

describe('SortMovies Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(SortMoviesComponent);
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

	it('should define the orderingOptions', () => {
		expect(componentInstance.orderingOptions).toEqual([
			{ value: 'id', isAscending: true, label: 'Default (Ascending)' },
			{ value: 'id', isAscending: false, label: 'Default (Descending)' },
			{ value: 'name', isAscending: true, label: 'Name (Ascending)' },
			{ value: 'name', isAscending: false, label: 'Name (Descending)' },
			{ value: 'rate', isAscending: true, label: 'Rate (Ascending)' },
			{ value: 'rate', isAscending: false, label: 'Rate (Descending)' },
			{ value: 'length', isAscending: true, label: 'Duration (Ascending)' },
			{ value: 'length', isAscending: false, label: 'Duration (Descending)' }
		]);
	});

	describe('OnInit', () => {
		beforeEach(async () => {
			componentFixture.detectChanges();
			await componentFixture.whenStable();
		});

		it('should call the getSortByParam method of moviesRouterService', () => {
			expect(mockGetSortByParam).toHaveBeenCalled();
		});

		it('should init the sortBySelect value', () => {
			expect(componentInstance.sortBySelect.value).toEqual({
				value: 'name',
				isAscending: false,
				label: 'Name (Descending)'
			});
		});

		it('should init the sortBySelect value to the default ordering option', async () => {
			mockGetSortByParam.mockReturnValue({ sortBy: null, isAscending: null });
			componentInstance.ngOnInit();
			componentFixture.detectChanges();
			await componentFixture.whenStable();
			expect(componentInstance.sortBySelect.value).toEqual({
				value: 'id',
				isAscending: true,
				label: 'Default (Ascending)'
			});
		});
	});

	describe('OnDestroy', () => {
		it('should unsubscribe to sortBySelectChangesSubscriber', () => {
			const spy = jest.fn();
			componentInstance.sortBySelectChangesSubscriber = {
				unsubscribe: spy
			};
			componentInstance.ngOnDestroy();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('onChangeSortBy', () => {
		it('should call the mockAppendSortByParam', () => {
			componentInstance.sortBySelect.value = {
				value: 'length',
				isAscending: true,
				label: 'Duration (Ascending)'
			};
			componentInstance.onChangeSortBy();
			expect(mockAppendSortByParam).toHaveBeenCalledWith('length', true);
		});

		it('should call the onChangeSortBy method if the value of sortBySelect changes', async () => {
			const spy = jest.spyOn(componentInstance, 'onChangeSortBy');
			componentInstance.sortBySelect.setValue({
				value: 'length',
				isAscending: true,
				label: 'Duration (Ascending)'
			});
			componentFixture.detectChanges();
			await componentFixture.whenStable();
			expect(spy).toHaveBeenCalled();
		});
	});
});
