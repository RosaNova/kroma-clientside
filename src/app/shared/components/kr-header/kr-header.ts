import { Component, Input } from '@angular/core';
import { Search, Calendar, Bell, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'kr-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './kr-header.html',
  styleUrls: ['./kr-header.css'],
})
export class KrHeader {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() date!: string;
  @Input() notificationCount!: number;
  Search = Search;
  Calendar = Calendar;
  Bell = Bell;
}