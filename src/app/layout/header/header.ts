import { ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  query = signal('');

  focusSearch(): void {
    this.searchInput.nativeElement.focus();
  }

  search(): void {
    console.log(this.query());
  }

  searchWithEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log(this.query());
    }
  }
}
