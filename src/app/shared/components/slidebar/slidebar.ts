import { Component , Input ,  OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule , LogOut ,  ChevronDown , LucideIconData ,ChevronRight } from 'lucide-angular';
import { Router ,RouterLink  ,RouterLinkActive} from '@angular/router';

interface NavItem {
  icon?: LucideIconData; 
  label: string;
  route?: string;   
  children?: NavItem[]; 
   isOpen?: boolean;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  standalone: true,
  selector: 'app-slidebar',
  imports: [CommonModule , LucideAngularModule , RouterLink ,RouterLinkActive ],
  templateUrl: './slidebar.html',
  styleUrl: './slidebar.css',
})
export class Slidebar {
 @Input() navbar!: NavItem[];
  @Input() user!: User;

  ChevronDown = ChevronDown;
  ChevronRight = ChevronRight;
  LogOut = LogOut;

  constructor(private router: Router) {}

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
}
