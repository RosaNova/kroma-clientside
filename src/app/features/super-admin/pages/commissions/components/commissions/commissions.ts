import { MOCK_MERCHANTS } from '@/app/core/mocks/super-admin/merchant.mock';
import { Component, computed, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
@Component({
  selector: 'app-commissions',
  imports: [LucideAngularModule, CommonModule, BoxDialogComponent, MatPaginatorModule],
  templateUrl: './commissions.html',
  styleUrl: './commissions.css',
})
export class Commissions {
  showConfirmDialog: boolean = false;
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
  store_id: string = '';
  commissions = signal<any[]>([]);
  allCommissions = signal<any[]>([]);
  totalCommissions = signal<number>(0);
  searchTerm = signal('');
  // currentPage = signal(1);
  // itemsPerPage = signal(10);
  currentPage = 0;
  itemsPerPage = 5;
  pageSize = 5;
  constructor(private merchantService: MerchantService) {
    this.getCommissions();
  }
  async getCommissions() {
    try {
      const res = await this.merchantService.getCommissions();
      if (res) {
        this.allCommissions.set(res.list);
        this.totalCommissions.set(res.list.length!);
        this.updateDisplayedCommissions();
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedCommissions() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.commissions.set(this.allCommissions().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedCommissions();
  }
  onShowDialog(id: string) {
    this.store_id = id;
    this.showConfirmDialog = true;
  }
  closeDialog() {
    this.showConfirmDialog = false;
  }
  async onMark() {
    const body = {};
    try {
      const res = await this.merchantService.updateCommissions(this.store_id, body);
      if (res) {
        await this.getCommissions();
        this.closeDialog();
      }
    } catch (e) {
      console.log(e);
    }
  }
  // filtered = computed(() =>
  //   MOCK_MERCHANTS.filter(
  //     (c) =>
  //       c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
  //       c.id.toString().includes(this.searchTerm()),
  //   ),
  // );

  // // Pagination
  // totalPages = computed(() => Math.max(Math.ceil(this.filtered().length / this.itemsPerPage()), 1));

  // startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  // endIndex = computed(() =>
  //   Math.min(this.startIndex() + this.itemsPerPage(), this.filtered().length),
  // );

  // paginated = computed(() => this.filtered().slice(this.startIndex(), this.endIndex()));

  // // Navigation
  // goToFirst() {
  //   this.currentPage.set(1);
  // }

  // goToLast() {
  //   this.currentPage.set(this.totalPages());
  // }

  // prev() {
  //   this.currentPage.update((p) => Math.max(p - 1, 1));
  // }

  // next() {
  //   this.currentPage.update((p) => Math.min(p + 1, this.totalPages()));
  // }

  // changeItemsPerPage(value: number) {
  //   this.itemsPerPage.set(value);
  //   this.currentPage.set(1);
  // }
}
