import GenreType from './genre.model';
import { MovieDetails } from './movie-details.model';

export interface MovieRawData {
	id: number;
	key: string;
	name: string;
	description: string;
	genres: string[];
	rate: string;
	length: string;
	img: string;
	tmdb: number;
}

export default class Movie {
	public details?: MovieDetails;

	constructor(
		public id: number,
		public key: string,
		public name: string,
		public description: string,
		public genres: GenreType[],
		public rate: string,
		public length: string,
		public img: string,
		public tmdb?: number
	) {}

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
			rawData.img,
			rawData.tmdb
		);
	}

	public buildDetails(info: any, contents: any): Movie {
		const { budget, homepage, overview, release_date, revenue } = info;
		const videos = contents.results.map(getRelevantVideoInfo);
		this.details = {
			videos,
			budget,
			homepage,
			overview,
			releaseDate: new Date(release_date),
			revenue
		};
		return this;

		function getRelevantVideoInfo({ id, key, name, site, type }) {
			return { id, key, name, site, type };
		}
	}
}
