import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxFormModule } from '@angular-redux/form';
import { StoreModule } from './store/store.module';
import { AppComponent } from './app.component';
import { MoviesModule } from './movies/movies.module';
import { AppLoaderModule } from './app-loader/app-loader.module';
import { AppRoutes } from './app.routes';
import { RoutesModule } from './routes/routes.module';
import { ResolversModule } from './resolvers/resolvers.module';

@NgModule({
	declarations: [AppComponent],
	exports: [],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(AppRoutes),
		NgReduxModule,
		NgReduxRouterModule.forRoot(),
		NgReduxFormModule,
		StoreModule,
		MoviesModule,
		AppLoaderModule,
		RoutesModule,
		ResolversModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
