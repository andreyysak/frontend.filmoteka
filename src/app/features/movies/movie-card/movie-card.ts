import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [DecimalPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  movie = input.required<Movie>();
  addToWatchlist = output<Movie>();

  posterUrl = computed(() => 'https://image.tmdb.org/t/p/w500' + this.movie().poster_path);

  onAddToWatchlist(): void {
    this.addToWatchlist.emit(this.movie());
  }
}
