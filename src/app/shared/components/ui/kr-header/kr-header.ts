import { Component, Input , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Search, Calendar, Bell, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'kr-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './kr-header.html',
  styleUrls: ['./kr-header.css'],
})
export class KrHeader {
  @Input() title: string = 'ផ្ទាំងគ្រប់គ្រង';
  @Input() subtitle: string = 'សូមស្វាគមន៍មកកាន់ Krama Dashboard';
  @Input() date: string = '០៨ ធ្នូ ២០២៤';
  @Input() notificationCount: number = 3;
  Search = Search;
  Calendar = Calendar;
  Bell = Bell;
}