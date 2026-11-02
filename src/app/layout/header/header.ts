import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  focusSearch(): void {
    this.searchInput.nativeElement.focus();
  }
}
