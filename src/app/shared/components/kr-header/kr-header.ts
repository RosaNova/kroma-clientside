import { Component, Input } from '@angular/core';
import { Search, Calendar, Bell, LucideAngularModule } from 'lucide-angular';
import { Notifications } from '../notifications/notifications';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kr-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Notifications],
  templateUrl: './kr-header.html',
  styleUrls: ['./kr-header.css'],
})
export class KrHeader {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() date!: Date;
  @Input() notificationCount!: number;

  Search = Search;
  Calendar = Calendar;
  Bell = Bell;

  updateCount(count: number) {
    this.notificationCount = count;
  }
}