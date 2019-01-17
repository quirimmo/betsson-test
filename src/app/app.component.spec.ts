import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
	let appComponentFixture, appComponentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent, AppLoaderComponent],
			imports: [RouterTestingModule]
		}).compileComponents();
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
});
