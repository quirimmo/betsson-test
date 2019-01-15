import GenreType from './genre.model';

export interface MovieRawData {
	id: number;
	key: string;
	name: string;
	description: string;
	genres: string[];
	rate: string;
	length: string;
	img: string;
}

export default class Movie {
	public static buildInstanceFromRaw(rawData: MovieRawData): Movie {
		const genres = rawData.genres.map(
			(g: string) => GenreType[g.charAt(0).toUpperCase() + g.substr(1)]
		);
		return new Movie(
			rawData.id,
			rawData.key,
			rawData.name,
			rawData.description,
			genres,
			rawData.rate,
			rawData.length,
			rawData.img
		);
	}

	constructor(
		public id: number,
		public key: string,
		public name: string,
		public description: string,
		public genres: GenreType[],
		public rate: string,
		public length: string,
		public img: string
	) {}
}
