import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material';
import { AppNavigatorLinkComponent } from './app-navigator-link.component';

const providers = [];
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

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});
});
