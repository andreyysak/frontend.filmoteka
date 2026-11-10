import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Movie } from '../../../shared/models/movie.model';

const TOP_RATING = 8;

@Component({
  selector: 'app-movie-card',
  imports: [DecimalPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  movie = input.required<Movie>();
  watchLaterList = input.required<Movie[]>();
  addToWatchlist = output<Movie>();

  posterUrl = computed(() => 'https://image.tmdb.org/t/p/w500' + this.movie().poster_path);
  year = computed(() => this.movie().release_date.slice(0, 4));
  addLabel = computed(() => `Додати ${this.movie().title} до списку переглянути пізніше`);
  isInList = computed(() => this.watchLaterList().some((m) => m.id === this.movie().id));
  isTop = computed(() => this.movie().vote_average >= TOP_RATING);

  onAddToWatchlist(): void {
    this.addToWatchlist.emit(this.movie());
  }
}
