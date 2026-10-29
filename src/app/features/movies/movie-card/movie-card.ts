import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Movie } from '../../../shared/models/movie.model';
import { MOCK_MOVIES } from '../movies.mock';

@Component({
  selector: 'app-movie-card',
  imports: [DecimalPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  movie: Movie = MOCK_MOVIES[0];

  get posterUrl(): string {
    return 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path;
  }
}
