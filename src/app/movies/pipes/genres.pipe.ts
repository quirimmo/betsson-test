import { Pipe, PipeTransform } from '@angular/core';
import Movie from '../movie.model';
import GenreType from '../genre.model';

@Pipe({ name: 'genres' })
export class GenresPipe implements PipeTransform {
	transform(genres: GenreType[] = []): string {
		return Object.entries(GenreType)
			.filter(([key, value]) => genres.includes(value))
			.map(([key, value]) => key)
			.join(' - ');
	}
}
