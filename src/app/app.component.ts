import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'betsoon-test';
	disableAnimations: boolean;

	constructor() {
		// pick from the environment if you need to disable the animations
		// they are disabled for e2e tests speed up
		this.disableAnimations = environment.disableAnimations;
	}
}
