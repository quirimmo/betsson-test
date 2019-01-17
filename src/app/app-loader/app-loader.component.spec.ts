import { TestBed, async } from '@angular/core/testing';
import { AppLoaderComponent } from './app-loader.component';

const providers = [];
const imports = [];
const declarations = [AppLoaderComponent];

describe('AppLoader Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(AppLoaderComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
	}));

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});
});
