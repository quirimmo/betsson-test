import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { MoviesModule } from 'src/app/movies/movies.module';

@NgModule({
	declarations: [HomePageComponent],
	imports: [CommonModule, MoviesModule],
	providers: [HomePageComponent],
	bootstrap: []
})
export class HomePageRouteModule {}
