import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from '../../../shared/models/movie.model';
import { MOCK_MOVIES } from '../movies.mock';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  movies: Movie[] = MOCK_MOVIES;
}
