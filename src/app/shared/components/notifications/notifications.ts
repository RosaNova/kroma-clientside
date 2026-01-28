import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Bell, Trash2, Check, AlertTriangle , Info , CheckCircle , LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-notifications',
  imports: [LucideAngularModule , CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  @Output() unreadChange = new EventEmitter<number>();

  Bell = Bell;
  Trash2 = Trash2;
  Check = Check;
  Info = Info;
  AlertTriangle = AlertTriangle;
  CheckCircle = CheckCircle;

  open = false;

  notifications = [
   {
      id: 1,
      type: "order",
      title: "ការបញ្ជាទិញថ្មី",
      description: "អតិថិជន សុខា បានបញ្ជាទិញផលិតផល ២ មុខ",
      time: "២ នាទីមុន",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "សារថ្មី",
      description: "អ្នកមានសារថ្មីពីអតិថិជន វុទ្ធី",
      time: "១៥ នាទីមុន",
      read: false,
    },
    {
      id: 3,
      type: "stock",
      title: "ស្តុកទាប",
      description: "ផលិតផល ប្រហុកខ្មែរ នៅសល់តែ ៥ មុខ",
      time: "១ ម៉ោងមុន",
      read: false,
    },
    {
      id: 4,
      type: "order",
      title: "ការបញ្ជាទិញបានបញ្ចប់",
      description: "ការបញ្ជាទិញ #១២៣៤ បានដឹកជញ្ជូនដោយជោគជ័យ",
      time: "២ ម៉ោងមុន",
      read: true,
    },
    {
      id: 5,
      type: "message",
      title: "មតិកែលម្អថ្មី",
      description: "អតិថិជនបានផ្តល់មតិកែលម្អ ៥ ផ្កាយ",
      time: "៣ ម៉ោងមុន",
      read: true,
    },
  ];

  ngOnInit() {
    this.emitUnread();
  }

  toggle() {
    this.open = !this.open;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  emitUnread() {
    this.unreadChange.emit(this.unreadCount);
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({
      ...n,
      read: true,
    }));
    this.emitUnread();
  }

  markAsRead(id: number) {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.emitUnread();
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.emitUnread();
  }

  getIcon(type: string) {
    switch (type) {
      case 'success':
        return this.CheckCircle;
      case 'warning':
        return this.AlertTriangle;
      default:
        return this.Info;
    }
  }

  getIconBg(type: string) {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  }
}
