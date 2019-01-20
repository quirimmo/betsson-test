import {
	browser,
	by,
	element,
	ElementFinder,
	ElementArrayFinder,
	promise
} from 'protractor';

export class AppPage {
	movieListItemsWrapper: ElementArrayFinder = element.all(
		by.css('.movie-list-item-wrapper')
	);
	noMoviesListMessage: ElementFinder = element(
		by.css('.no-movies-list-message')
	);
	seachMovieName: ElementFinder = element(by.css('#search-movie-name'));
	selectGenresTrigger: ElementFinder = element(by.css('.mat-select-trigger'));
	sortMoviesTrigger: ElementFinder = element(
		by.css('.sort-movies-container .mat-select-trigger')
	);
	genresOptions: ElementArrayFinder = element.all(by.css('.genre-options'));
	sortMoviesOptions: ElementArrayFinder = element.all(
		by.css('.sort-movies-options')
	);
	body: ElementFinder = element(by.css('body'));
	movieDetailsCover: ElementFinder = element(by.css('.movie-details-cover'));
	movieDetailsTitle: ElementFinder = element(by.css('.movie-details-title'));
	movieDetailsGenres: ElementFinder = element(by.css('.movie-details-genres'));
	movieDetailsRate: ElementFinder = element(by.css('.movie-details-rate'));
	movieDetailsDescription: ElementFinder = element(
		by.css('.movie-details-description')
	);
	movieDetailsDuration: ElementFinder = element(
		by.css('.movie-details-duration')
	);
	navigateBackButton: ElementFinder = element(by.css('.back-navigation-text'));

	async navigateToHome(): Promise<void> {
		await browser.get('/');
	}

	async getMovieListItemsTitles(): promise.Promise<{}[]> {
		return await this.movieListItemsWrapper.map((el: ElementFinder) =>
			el.$('.movie-item-card-title').getText()
		);
	}

	async getMovieListItemsRates(): promise.Promise<{}[]> {
		return await this.movieListItemsWrapper.map((el: ElementFinder) =>
			el.$('.movie-item-card-rate').getText()
		);
	}

	async getMovieListItemsImages(): promise.Promise<{}[]> {
		return await this.movieListItemsWrapper.map((el: ElementFinder) =>
			el.$('.movie-item-image').getAttribute('alt')
		);
	}

	async setSearchMovieName(name: string): Promise<void> {
		await this.seachMovieName.clear();
		await this.seachMovieName.sendKeys(name);
	}

	async selectAllGenres(): Promise<void> {
		await this.selectGenresTrigger.click();
		await this.genresOptions.each(el => el.click());
		await this.body.click();
		await this.scrollToTop();
	}

	async selectActionGenre(): Promise<void> {
		await this.selectGenresTrigger.click();
		await this.genresOptions.each((el, ind) =>
			ind > 0 ? el.click() : promise.Promise.resolve(true)
		);
		await this.body.click();
		await this.scrollToTop();
	}

	async scrollToTop(): Promise<void> {
		await browser.executeScript('window.scrollTo(0,0);');
	}

	async navigateBackToMovies(): Promise<void> {
		await this.navigateBackButton.click();
	}

	async selectDeadpool(): Promise<void> {
		await this.movieListItemsWrapper.first().click();
	}

	async sortMoviesByName(): Promise<void> {
		await this.sortMoviesTrigger.click();
		await this.sortMoviesOptions.each((el, ind) =>
			ind === 2 ? el.click() : promise.Promise.resolve(true)
		);
		await this.body.click();
		await this.scrollToTop();
	}

	async sortMoviesByIdDescending(): Promise<void> {
		await this.sortMoviesTrigger.click();
		await this.sortMoviesOptions.each((el, ind) =>
			ind === 1 ? el.click() : promise.Promise.resolve(true)
		);
		await this.body.click();
		await this.scrollToTop();
	}
}
