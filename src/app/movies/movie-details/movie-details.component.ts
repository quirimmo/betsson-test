import { Component, Input } from '@angular/core';
import Movie from '../movie.model';
import {
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
		slideOutRightOnLeaveAnimation({ duration: 100 })
	]
})
export class MovieDetailsComponent {
	@Input()
	movie: Movie;

	constructor() {}
}
