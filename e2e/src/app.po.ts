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

	getSearchMovieName() {
		return element(by.css('#search-movie-name'));
	}

	getSearchMovieGenres() {
		return element(by.css('#seach-movie-genres'));
	}
}
