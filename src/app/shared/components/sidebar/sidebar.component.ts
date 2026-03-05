import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut, ChevronDown, LucideIconData, ChevronRight } from 'lucide-angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  icon?: LucideIconData;
  label: string;
  route?: string;
  children?: NavItem[];
  isOpen?: boolean;
}

export interface User {
  fullname: string;
  role : string;
  profile: string;
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
  @Input() user!: User;

  ChevronDown = ChevronDown;
  ChevronRight = ChevronRight;
  LogOut = LogOut;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Auto-open dropdown if a child route is active
    this.navbar.forEach(item => {
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

    return item.children.some(child =>
      this.router.isActive(child.route!, false)
    );
  }

  logout(): void {
    // Implement logout logic here (e.g., clear auth tokens, redirect to login page)
    console.log('Logging out...');
    // Example: this.authService.logout();
    this.router.navigate(['/login']);
  }
}
