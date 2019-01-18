import { TestBed } from '@angular/core/testing';
import { GenresPipe } from './genres.pipe';
import GenreType from '../genre.model';

const providers = [GenresPipe];

describe('Genres Pipe', () => {
	let pipe: GenresPipe;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers
		});
		pipe = TestBed.get(GenresPipe);
	});

	it('should return an empty string', () => {
		expect(pipe.transform([])).toEqual('');
	});

	it('should return a single converted genre with no dashes', () => {
		expect(pipe.transform([GenreType.Action])).toEqual('Action');
	});

	it('should return the list of genres seprated by dashes', () => {
		expect(
			pipe.transform([GenreType.Action, GenreType.Comedy, GenreType.Thriller])
		).toEqual('Action - Comedy - Thriller');
	});
});
