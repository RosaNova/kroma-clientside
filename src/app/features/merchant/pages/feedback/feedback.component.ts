import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { StarRating } from '@/app/shared/components/ui/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ChangeType, Variant } from '@/app/core/models/ui.types';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  MessageSquare,
  Star,
  Users,
  Eye,
  TrendingUp,
  LucideAngularModule,
  Trash2,
  User,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from './service/feedback-service';
import { FeedBack } from './model/feedback';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface FeedbackType {
  id: string;
  customer: string;
  comment: string;
  category: string;
  rating: number;
  date: string;
}

export interface StatCardItem {
  title: string;
  value: string;
  icon: any; // Lucide icon
  change: string;
  changeType: ChangeType;
  variant: Variant;
}

@Component({
  selector: 'app-feedback',
  imports: [
    StarRating,
    StatCard,
    CommonModule,
    FormsModule,
    LucideAngularModule,
    BoxDialogComponent,
    DeleteDialog,
    MatPaginatorModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class Feedback {
  showViewDialog: boolean = false;
  showDeleteDialog: boolean = false;
  selectedName: string = '';
  Trash2 = Trash2;
  Eye = Eye;
  User = User;
  searchTerm: string = '';
  ratingFilter: string = 'all';
  feedbacks = signal<FeedBack[]>([]);
  private allFeedBacks = signal<FeedBack[]>([]);
  totalFeedbacks = signal<number>(0);
  feedback = signal<FeedBack>({} as any);
  storeFeedBackId: string = '';
  currentPage = 0;
  itemsPerPage = 5;
  pageSize = 5;
  feedbackData: FeedbackType[] = [
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
    {
      id: '101',
      customer: 'សុខ មិនាកា',
      comment: 'ផលិតផលល្អណាស់ គុណភាពខ្ពស់...',
      category: 'ផលិតផលទូទៅ',
      rating: 5,
      date: '២០២៥-០១-២០',
    },
    {
      id: '102',
      customer: 'សុខ មិនាកា',
      comment: 'សេវាកម្មរហ័សណាស់ អរគុណ...',
      category: 'សេវាកម្ម',
      rating: 5,
      date: '២០២៥-០១-១៩',
    },
  ];
  constructor(
    private feedbackService: FeedbackService,
    private snackbar: MatSnackBar,
  ) {
    this.getFeedbacks();
  }
  async getFeedbacks() {
    try {
      const res = await this.feedbackService.getFeedbacks();
      if (res) {
        this.allFeedBacks.set(res.list);
        this.totalFeedbacks.set(res.list.length!);
        this.updateDisplayedFeedbacks();
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedFeedbacks() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.feedbacks.set(this.allFeedBacks().slice(startIndex, endIndex));
  }
  async onSearch(event: KeyboardEvent) {
    try {
      const inputKey = (event.target as HTMLInputElement).value;
      if (inputKey != '') {
        const res = await this.feedbackService.search({ q: inputKey });
        this.allFeedBacks.set(res.list ?? []);
      } else {
        await this.getFeedbacks();
        return;
      }
      this.totalFeedbacks.set(this.allFeedBacks().length);
      this.currentPage = 0;
      this.updateDisplayedFeedbacks();
    } catch (e) {
      console.log(e);
    }
  }
  async onFilter(event: Event) {
    try {
      const value = (event.target as HTMLSelectElement).value;
      if (value != '') {
        const res = await this.feedbackService.search({ q: value });
        this.allFeedBacks.set(res.list ?? []);
      } else {
        await this.getFeedbacks();
        return;
      }
      this.totalFeedbacks.set(this.allFeedBacks().length);
      this.currentPage = 0;
      this.updateDisplayedFeedbacks();
    } catch (e) {
      console.log(e);
    }
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedFeedbacks();
  }
  onCloseViewDialog() {
    this.showViewDialog = false;
  }
  onViewDetail(data: FeedBack) {
    this.showViewDialog = true;
    this.feedback.set(data);
  }
  onOpenDeleteDialog(id: string, name: string) {
    this.selectedName = name;
    this.storeFeedBackId = id;
    this.showDeleteDialog = true;
  }
  onCancelDelete() {
    this.showDeleteDialog = false;
  }
  async handleDelete() {
    try {
      const res = await this.feedbackService.deleteFeedBack(this.storeFeedBackId);
      if (res) {
        this.showDeleteDialog = false;
        this.snackbar.open('Feedback deleted successfully', 'OK', { duration: 2000 });
        this.getFeedbacks();
      }
    } catch (e) {
      console.log(e);
    }
  }
  get filteredData() {
    return this.feedbackData.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.id.includes(this.searchTerm) ||
        item.comment.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRating = this.ratingFilter === 'all' || item.rating === +this.ratingFilter;
      return matchesSearch && matchesRating;
    });
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get averageRating() {
    const total = this.feedbackData.reduce((sum, f) => sum + f.rating, 0);
    return (total / this.feedbackData.length).toFixed(1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  feedbackStats: StatCardItem[] = [
    {
      title: 'សរុប Feedback',
      value: '110', // replace with dynamic value if needed
      icon: MessageSquare,
      change: '+១២% ពីខែមុន',
      changeType: 'positive',
      variant: 'pink',
    },
    {
      title: 'ពិន្ទុមធ្យម',
      value: '4.8/5', // replace with dynamic averageRating
      icon: Star,
      change: '+០.២ ពីខែមុន',
      changeType: 'positive',
      variant: 'yellow',
    },
    {
      title: 'អតិថិជនបានផ្តល់មតិ',
      value: '១២៥',
      icon: Users,
      change: '+៨% ពីខែមុន',
      changeType: 'positive',
      variant: 'green',
    },
    {
      title: 'អត្រាពេញចិត្ត',
      value: '៩៥%',
      icon: TrendingUp,
      change: '+៣% ពីខែមុន',
      changeType: 'positive',
      variant: 'blue',
    },
  ];
  Math = Math;
}
