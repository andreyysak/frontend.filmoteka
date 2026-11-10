import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
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
  watchLaterList = signal<Movie[]>([]);

  addToWatchlist(movie: Movie): void {
    this.watchLaterList.update((list) => [...list, movie]);
    console.log(`${movie.title} added to watch list`);
  }
}
