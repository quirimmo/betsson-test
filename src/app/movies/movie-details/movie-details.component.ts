import { Component, Input } from '@angular/core';
import Movie from '../movie.model';
import {
	bounceOutOnLeaveAnimation,
	bounceInUpOnEnterAnimation,
	slideInLeftOnEnterAnimation,
	slideOutRightOnLeaveAnimation,
	jackInTheBoxOnEnterAnimation
} from 'angular-animations';

@Component({
	selector: 'movie-details',
	inputs: ['movie'],
	styleUrls: ['./movie-details.component.scss'],
	templateUrl: './movie-details.component.html',
	animations: [
		jackInTheBoxOnEnterAnimation(),
		bounceInUpOnEnterAnimation({ duration: 500 }),
		bounceOutOnLeaveAnimation({ duration: 350 }),
		slideInLeftOnEnterAnimation({ duration: 100, delay: 350 }),
		slideOutRightOnLeaveAnimation({ duration: 100 })
	]
})
export class MovieDetailsComponent {
	@Input()
	movie: Movie;

	constructor() {}
}
