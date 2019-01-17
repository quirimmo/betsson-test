import { AppPage } from './app.po';
import { ElementFinder, browser } from 'protractor';
import {
	MOVIE_TITLES,
	MOVIE_RATES,
	MOVIE_IMAGES,
	ACTION_MOVIE_TITLES
} from './app.data';

describe('General Playgroung', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it('should display the list of all the movies', () => {
		page.navigateToHome();
		expect(page.getMovieListItems().count()).toEqual(24);
		expect(page.getMovieListItemsTitles()).toEqual(MOVIE_TITLES);
		expect(page.getMovieListItemsRates()).toEqual(MOVIE_RATES);
		expect(page.getMovieListItemsImages()).toEqual(MOVIE_TITLES);
	});

	it('should filter the list of the movies', async () => {
		page.navigateToHome();
		expect(page.getMovieListItems().count()).toEqual(24);
		await page.getSearchMovieName().sendKeys('deadpool');
		// wait for animations to finish
		await browser.waitForAngular();
		await timeout(3000);
		expect(page.getMovieListItems().count()).toEqual(1);
		expect(page.getMovieListItemsTitles()).toEqual(['Deadpool']);
		await page.getSearchMovieName().clear();
		await page.getSearchMovieName().sendKeys('idonotexist');
		// wait for animations to finish
		await browser.waitForAngular();
		await timeout(3000);
		expect(page.getMovieListItems().count()).toEqual(0);
		expect(page.getNoMoviesListMessage().getText()).toEqual(
			'It looks like there are not movies corresponding to your search...\n' +
				'Try changing your filters!'
		);
		await page.getSearchMovieName().clear();
		await page.getSearchMovieName().sendKeys(' ');
		// wait for animations to finish
		await browser.waitForAngular();
		await timeout(3000);
		expect(page.getMovieListItems().count()).toEqual(24);
		await page.getSearchMovieGenres().clear();
		// wait for animations to finish
		await browser.waitForAngular();
		await timeout(3000);
		expect(page.getMovieListItems().count()).toEqual(0);
		expect(page.getNoMoviesListMessage().getText()).toEqual(
			'It looks like there are not movies corresponding to your search...\n' +
				'Try changing your filters!'
		);
		await page.getSearchMovieGenres().sendKeys('action');
		// wait for animations to finish
		await browser.waitForAngular();
		await timeout(3000);
		expect(page.getMovieListItems().count()).toEqual(15);
		expect(page.getMovieListItemsTitles()).toEqual(ACTION_MOVIE_TITLES);
	});
});

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
