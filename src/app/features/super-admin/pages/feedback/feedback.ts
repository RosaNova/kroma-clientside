import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Search,
  Filter,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  MoreVertical,
  X,
  ArrowUpRight,
  FileUp,
  Smartphone,
  ShoppingBag,
} from 'lucide-angular';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { FEEDBACK_STATS, MOCK_FEEDBACK } from '@/app/core/mocks/super-admin/feedback.mock';
import { FeedbackType } from '@/app/core/models/ui.types';
import { FeedbackService } from './service/feedback-service';
import { FeedBack } from '@/app/features/merchant/pages/feedback/model/feedback';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { Overall } from './model/overall';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StatCard,
    BoxDialogComponent,
    MatPaginatorModule,
    DeleteDialog,
  ],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css'],
})
export class Feedback {
  // Mock Data
  STATS = FEEDBACK_STATS;

  // Icons
  Search = Search;
  Filter = Filter;
  Star = Star;
  MessageSquare = MessageSquare;
  ThumbsUp = ThumbsUp;
  ThumbsDown = ThumbsDown;
  CheckCircle = CheckCircle;
  Clock = Clock;
  Eye = Eye;
  Trash2 = Trash2;
  MoreVertical = MoreVertical;
  X = X;
  ArrowUpRight = ArrowUpRight;
  FileUp = FileUp;
  Smartphone = Smartphone;
  ShoppingBag = ShoppingBag;
  showDeleteDialog: boolean = false;
  selectedName: string = '';
  storeId: string = '';
  // State Signals
  searchTerm = signal('');
  categoryFilter = signal<'all' | 'marketplace' | 'app'>('all');
  statusFilter = signal<'all' | 'pending' | 'resolved' | 'hidden'>('all');
  ratingFilter = signal<number>(0);

  // Dialog State
  showDetailDialog = false;
  selectedFeedback = signal<FeedBack | null>(null);
  allFeedbacks = signal<FeedBack[]>([]);
  feedbacks = signal<FeedBack[]>([]);
  totalFeedback = signal<number>(0);
  currentPage = 0;
  itemsPerPage = 5;
  pageSize = 5;
  storeStar = signal<number>(0);
  overAllData = signal<Overall>({} as any);
  average_star = signal<number>(0);
  positive_proportion = signal<number>(0);
  negative_proportion = signal<number>(0);
  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
  ) {
    this.getMany();
    this.getOverall();
  }
  async getMany() {
    try {
      const res = await this.feedbackService.getMany();
      if (res) {
        this.allFeedbacks.set(res.list);
        this.totalFeedback.set(res.list.length!);
        this.updateDisplayedFeedbacks();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getOverall() {
    try {
      const res = await this.feedbackService.getOverall();
      if (res) {
        this.overAllData.set(res);
        const convert_negative_proportion = Number(
          this.overAllData().calculate_average.negative_proportion.toFixed(2),
        );
        const convert_positive_proportion = Number(
          this.overAllData().calculate_average.positive_proportion.toFixed(2),
        );
        const convert_average_star = Number(
          this.overAllData().calculate_average.average_star.toFixed(2),
        );
        this.negative_proportion.set(convert_negative_proportion);
        this.average_star.set(convert_average_star);
        this.positive_proportion.set(convert_positive_proportion);
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedFeedbacks() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.feedbacks.set(this.allFeedbacks().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedFeedbacks();
  }
  // Computed filtered feedback
  filteredFeedback = computed(() => {
    return MOCK_FEEDBACK.filter((fb) => {
      const matchesSearch =
        fb.customerName.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        fb.comment.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        fb.productName?.toLowerCase().includes(this.searchTerm().toLowerCase());

      const matchesCategory =
        this.categoryFilter() === 'all' || fb.category === this.categoryFilter();
      const matchesStatus = this.statusFilter() === 'all' || fb.status === this.statusFilter();
      const matchesRating = this.ratingFilter() === 0 || fb.rating === this.ratingFilter();

      return matchesSearch && matchesCategory && matchesStatus && matchesRating;
    });
  });

  // Actions
  async onSearch(event: KeyboardEvent) {
    const inputKey = (event.target as HTMLInputElement).value;
    if (inputKey != '') {
      const res = await this.feedbackService.search({ q: inputKey });
      if (res.list) {
        this.feedbacks.set(res.list);
      } else {
        this.feedbacks.set([]);
      }
    } else {
      await this.getMany();
    }
  }
  async onFilter(star: number) {
    this.storeStar.set(star);
    try {
      const res = await this.feedbackService.search({ q: star });
      if (res.list) {
        this.feedbacks.set(res.list);
      } else {
        this.getMany();
      }
    } catch (e) {
      console.log(e);
    }
  }
  showAll() {
    this.getMany();
    this.storeStar.set(0);
  }
  setCategoryFilter(category: any) {
    this.categoryFilter.set(category);
  }

  setStatusFilter(status: any) {
    this.statusFilter.set(status);
  }

  setRatingFilter(rating: number) {
    this.ratingFilter.set(rating === this.ratingFilter() ? 0 : rating);
  }

  openDetail(fb: FeedBack) {
    this.selectedFeedback.set(fb);
    this.showDetailDialog = true;
  }

  closeDetail() {
    this.showDetailDialog = false;
    this.selectedFeedback.set(null);
  }

  resolveFeedback(id: string) {
    console.log('Resolving feedback:', id);
    // In a real app, update the state or call an API
    this.closeDetail();
  }

  hideFeedback(id: string) {
    console.log('Hiding feedback:', id);
    this.closeDetail();
  }
  onOpenDelete(id: string, name: string) {
    this.showDeleteDialog = true;
    this.storeId = id;
    this.selectedName = name;
  }
  closeDelete() {
    this.showDeleteDialog = false;
  }
  async onDelete() {
    try {
      const res = await this.feedbackService.delete(this.storeId);
      if (res) {
        this.showDeleteDialog = false;
        this.snackBar.open('Feedback deleted successfully!', 'OK', { duration: 2000 });
        this.getMany();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
