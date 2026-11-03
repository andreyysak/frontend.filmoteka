import { booleanAttribute, Component, contentChild, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  title = contentChild<ElementRef<HTMLElement>>('cardTitleRef');
  highlighted = input(false, { transform: booleanAttribute });
}
