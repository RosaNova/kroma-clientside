import { CommonModule } from '@angular/common';
import { Component , Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  standalone : true,
  selector: 'app-product-card',
  imports: [CommonModule ,  RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
@Input() image! : string ;
@Input() name! : string ;
@Input() price! : string ;
@Input() stock! : number ;
@Input() stockUnit! : string  ;
}
