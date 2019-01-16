import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMoviePageComponent } from './view-movie-page.component';
import { MoviesModule } from 'src/app/movies/movies.module';
import { RouterModule } from '@angular/router';
import { AppNavigatorLinkModule } from 'src/app/app-navigator-link/app-navigator-link.module';

@NgModule({
	declarations: [ViewMoviePageComponent],
	imports: [CommonModule, MoviesModule, RouterModule, AppNavigatorLinkModule],
	providers: [ViewMoviePageComponent],
	bootstrap: []
})
export class ViewMoviePageRouteModule {}
