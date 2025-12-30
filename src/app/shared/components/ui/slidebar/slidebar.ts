import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule , LogOut ,  ChevronDown } from 'lucide-angular';

interface NavItem {
  icon: any; 
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}




@Component({
    standalone: true,
  selector: 'app-slidebar',
  imports: [CommonModule , LucideAngularModule ],
 templateUrl: './slidebar.html',
  styleUrl: './slidebar.css',
})
export class Slidebar {
  ChevronDown = ChevronDown;
  LogOut = LogOut;
 @Input() navbar!: NavItem[];
 @Input() user! : User;
}
