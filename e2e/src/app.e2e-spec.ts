import { AppPage } from './app.po';
import { browser } from 'protractor';
import {
	MOVIE_TITLES,
	MOVIE_RATES,
	ACTION_MOVIE_TITLES,
	NO_MOVIES_MESSAGE,
	FILTERED_ACTION_MOVIES,
	DEADPOOL_DESCRIPTION,
	DEADPOOL_RATE,
	DEADPOOL_GENRES
} from './app.data';

describe('General Playgroung', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it('should display the list of all the movies', () => {
		page.navigateToHome();
		expect(page.getMovieListItemsTitles()).toEqual(MOVIE_TITLES);
		expect(page.getMovieListItemsRates()).toEqual(MOVIE_RATES);
		expect(page.getMovieListItemsImages()).toEqual(MOVIE_TITLES);
	});

	it('should filter the list of the movies', async () => {
		page.navigateToHome();
		expect(page.getMovieListItems().count()).toEqual(24);
		await page.setSearchMovieName('deadpool');
		expect(page.getMovieListItemsTitles()).toEqual(['Deadpool']);
		await page.setSearchMovieName('idonotexist');
		expect(page.getMovieListItems().count()).toEqual(0);
		expect(page.getNoMoviesListMessage().getText()).toEqual(NO_MOVIES_MESSAGE);
		await page.setSearchMovieName(' ');
		expect(page.getMovieListItems().count()).toEqual(24);
		await page.selectActionGenre();
		expect(page.getMovieListItemsTitles()).toEqual(ACTION_MOVIE_TITLES);
		await page.setSearchMovieName('ad');
		expect(page.getMovieListItemsTitles()).toEqual(FILTERED_ACTION_MOVIES);
	});

	it('should open the movie details and navigate back to the movies', async () => {
		page.navigateToHome();
		await page.selectDeadpool();
		expect(browser.getCurrentUrl()).toContain('/movie/1');
		expect(page.getMovieDetailsImage()).toContain('deadpool.jpg');
		expect(page.getMovieDetailsTitle()).toEqual('DEADPOOL');
		expect(page.getMovieDetailsGenres()).toEqual(DEADPOOL_GENRES);
		expect(page.getMovieDetailsRate()).toEqual(DEADPOOL_RATE);
		expect(page.getMovieDetailsDescription()).toEqual(DEADPOOL_DESCRIPTION);
		await page.navigateBackToMovies();
		expect(page.getMovieListItems().count()).toEqual(24);
	});
});
