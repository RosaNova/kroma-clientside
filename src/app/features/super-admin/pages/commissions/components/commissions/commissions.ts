import { MOCK_MERCHANTS } from '@/app/core/mocks/super-admin/merchant.mock';
import { Component, computed, signal } from '@angular/core';
import {
  LucideAngularModule,
  Package,
  PackageIcon,
  CarIcon,
  WalletIcon,
  BoxIcon,
  Plus,
  Wallet,
  ShoppingCart,
  Box,
  Search,
  Eye,
  FileUp,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Phone,
  Mail,
  Calendar,
  Star,
} from 'lucide-angular';
import { MerchantService } from '../../../merchant/services/merchant-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-commissions',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './commissions.html',
  styleUrl: './commissions.css',
})
export class Commissions {
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronsLeft = ChevronsLeft;
  ChevronsRight = ChevronsRight;
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  ShoppingCart = ShoppingCart;
  Phone = Phone;
  Mail = Mail;
  Calendar = Calendar;
  Star = Star;
  Plus = Plus;
  Eye = Eye;
  Trash2 = Trash2;
  Edit = Edit;
  FileUp = FileUp;
  Search = Search;
  commissions = signal<any[]>([]);
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  constructor(private merchantService: MerchantService) {
    this.getCommissions();
  }
  async getCommissions() {
    try {
      const res = await this.merchantService.getCommissions();
      if (res) {
        this.commissions.set(res.list);
        console.log(this.commissions());
      }
    } catch (e) {
      console.log(e);
    }
  }
  filtered = computed(() =>
    MOCK_MERCHANTS.filter(
      (c) =>
        c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        c.id.toString().includes(this.searchTerm()),
    ),
  );

  // Pagination
  totalPages = computed(() => Math.max(Math.ceil(this.filtered().length / this.itemsPerPage()), 1));

  startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  endIndex = computed(() =>
    Math.min(this.startIndex() + this.itemsPerPage(), this.filtered().length),
  );

  paginated = computed(() => this.filtered().slice(this.startIndex(), this.endIndex()));

  // Navigation
  goToFirst() {
    this.currentPage.set(1);
  }

  goToLast() {
    this.currentPage.set(this.totalPages());
  }

  prev() {
    this.currentPage.update((p) => Math.max(p - 1, 1));
  }

  next() {
    this.currentPage.update((p) => Math.min(p + 1, this.totalPages()));
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage.set(value);
    this.currentPage.set(1);
  }
}
