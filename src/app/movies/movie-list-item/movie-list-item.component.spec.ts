import { TestBed, async } from '@angular/core/testing';
import { FilterMoviesComponent } from '../filter-movies/filter-movies.component';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';

const providers = [];
const imports = [];
const declarations = [MovieListItemComponent];

describe('MoviesListItem Component', () => {
	let componentFixture, componentInstance;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations,
			providers,
			imports
		}).compileComponents();
		componentFixture = TestBed.createComponent(MovieListItemComponent);
		componentInstance = componentFixture.debugElement.componentInstance;
	}));

	it('should create the component', () => {
		expect(componentFixture).toBeTruthy();
	});

	it('should match the snapshot', () => {
		expect(componentFixture).toMatchSnapshot();
	});
});
