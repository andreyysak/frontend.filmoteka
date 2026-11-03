import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { MovieList } from './features/movies/movie-list/movie-list';
import { Card } from './shared/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MovieList, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  @ViewChild(Header) header!: Header;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.header.focusSearch();
  }
}
