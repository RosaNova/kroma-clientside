import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LogOut,
  ChevronDown,
  LucideIconData,
  ChevronRight,
} from 'lucide-angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  icon?: LucideIconData;
  label: string;
  route?: string;
  children?: NavItem[];
  isOpen?: boolean;
}

export interface UserDashboradAccount {
  fullname: string;
  role: string;
  profile_url?: string
}

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() navbar!: NavItem[];
  @Input() user!: UserDashboradAccount;
  @Input() canLogout: boolean = true;
  @Input() onLogout?: () => void;

  ChevronDown = ChevronDown;
  ChevronRight = ChevronRight;
  LogOut = LogOut;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Auto-open dropdown if a child route is active
    this.navbar.forEach((item) => {
      if (item.children) {
        item.isOpen = this.isParentActive(item);
      }
    });
  }

  onParentClick(item: NavItem): void {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  isParentActive(item: NavItem): boolean {
    if (!item.children) return false;

    return item.children.some((child) => this.router.isActive(child.route!, false));
  }

  logout(): void {
    if (this.onLogout) {
      try {
        this.onLogout();
      } catch (e) {
        console.error('onLogout handler error', e);
      }
      return;
    }
    // default logout behavior
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (e) {
      console.error('Error clearing storage during logout', e);
    }
    this.router.navigate(['/login']);
  }
}
