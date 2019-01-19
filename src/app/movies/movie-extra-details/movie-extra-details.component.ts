import { Component, Input } from '@angular/core';
import { MovieDetails } from '../movie-details.model';
import { bounceInUpOnEnterAnimation } from 'angular-animations';

@Component({
	selector: 'movie-extra-details',
	inputs: ['movie-details'],
	styleUrls: ['./movie-extra-details.component.scss'],
	templateUrl: './movie-extra-details.component.html',
	animations: [bounceInUpOnEnterAnimation({ delay: 600, duration: 400 })]
})
export class MovieExtraDetailsComponent {
	@Input('movie-details')
	movieDetails: MovieDetails;

	constructor() {}
}
