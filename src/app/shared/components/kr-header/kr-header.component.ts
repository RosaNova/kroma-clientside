import { Component, Input } from '@angular/core';
import { Search, Calendar, Bell, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Notifications } from '../notifications/notifications.component';

@Component({
  selector: 'kr-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Notifications],
  templateUrl: './kr-header.component.html',
  styleUrls: ['./kr-header.component.css'],
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