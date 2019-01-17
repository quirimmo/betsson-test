import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterMoviesComponent } from './filter-movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule
} from '@angular/material';

const providers = [];
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
			expect(componentInstance.genresSelect.value).toEqual(['genre1']);
		});
	});
});
