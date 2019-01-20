import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('./../environments/environment', () => ({
	environment: {
		disableAnimations: false
	}
}));
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { AppComponent } from './app.component';

const MockAppLoaderComponent = {
	set: {
		template: '<span>app loader</span>'
	}
};

describe('AppComponent', () => {
	let appComponentFixture, appComponentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent, AppLoaderComponent],
			imports: [RouterTestingModule]
		})
			.overrideComponent(AppLoaderComponent, MockAppLoaderComponent)
			.compileComponents();
		appComponentFixture = TestBed.createComponent(AppComponent);
		appComponentInstance = appComponentFixture.debugElement.componentInstance;
	}));

	it('should create the component', () => {
		expect(appComponentInstance).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(appComponentFixture).toMatchSnapshot();
	});

	it(`should have as title 'betsoon-test'`, () => {
		expect(appComponentInstance.title).toEqual('betsoon-test');
	});

	it('should not disable the animations', () => {
		expect(appComponentInstance.disableAnimations).toBeFalsy();
	});
});
