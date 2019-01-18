import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
	navigateToHome() {
		return browser.get('/');
	}

	getMovieListItems() {
		return element.all(by.css('.movie-list-item-wrapper'));
	}

	getMovieListItemsTitles() {
		return this.getMovieListItems().map((el: ElementFinder, ind: number) =>
			el.$('.movie-item-card-title').getText()
		);
	}

	getMovieListItemsRates() {
		return this.getMovieListItems().map((el: ElementFinder, ind: number) =>
			el.$('.movie-item-card-rate').getText()
		);
	}

	getMovieListItemsImages() {
		return this.getMovieListItems().map((el: ElementFinder, ind: number) =>
			el.$('.movie-item-image').getAttribute('alt')
		);
	}

	getNoMoviesListMessage() {
		return element(by.css('.no-movies-list-message'));
	}

	async setSearchMovieName(name: string) {
		const searchMovieName = element(by.css('#search-movie-name'));
		await searchMovieName.clear();
		await searchMovieName.sendKeys(name);
	}

	async selectActionGenre() {
		await element(by.css('.mat-select-trigger')).click();
		await element.all(by.css('.genre-options')).each((el, ind) => {
			if (ind > 0) {
				el.click();
			}
		});
		await element(by.css('body')).click();
		await browser.executeScript('window.scrollTo(0,0);');
	}

	getMovieDetailsImage() {
		return element(by.css('.movie-details-cover')).getAttribute('src');
	}

	getMovieDetailsTitle() {
		return element(by.css('.movie-details-title')).getText();
	}

	getMovieDetailsGenres() {
		return element(by.css('.movie-details-genres')).getText();
	}

	getMovieDetailsRate() {
		return element(by.css('.movie-details-rate')).getText();
	}

	getMovieDetailsDescription() {
		return element(by.css('.movie-details-description')).getText();
	}

	async navigateBackToMovies() {
		await element(by.css('.back-navigation-text')).click();
	}

	selectDeadpool() {
		return this.getMovieListItems()
			.first()
			.click();
	}
}
