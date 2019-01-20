import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MovieExtraDetailsComponent } from './movie-extra-details.component';

const declarations = [MovieExtraDetailsComponent];
const providers = [];
const imports = [];

describe('MovieExtraDetails Component', () => {
	let componentFixture: ComponentFixture<any>, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(MovieExtraDetailsComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
	}));

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});
});
