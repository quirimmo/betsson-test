import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesDAOService } from './movies.dao';
import { MoviesActions } from './movies.actions';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';

@NgModule({
	declarations: [MoviesListComponent, MovieListItemComponent],
	exports: [MoviesListComponent, MovieListItemComponent],
	imports: [HttpClientModule, CommonModule],
	providers: [MoviesDAOService, MoviesActions]
})
export class MoviesModule {}
