import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Filter, Star, MessageSquare, ThumbsUp, ThumbsDown, CheckCircle, Clock, Eye, Trash2, MoreVertical, X, ArrowUpRight, FileUp, Smartphone, ShoppingBag } from 'lucide-angular';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { BoxDialogComponent } from "@/app/shared/components/ui/box-dialog/box-dialog.component";
import { FEEDBACK_STATS, MOCK_FEEDBACK } from '@/app/core/mocks/super-admin/feedback.mock';
import { FeedbackType } from '@/app/core/models/ui.types';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatCard, BoxDialogComponent],
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

  // State Signals
  searchTerm = signal('');
  categoryFilter = signal<'all' | 'marketplace' | 'app'>('all');
  statusFilter = signal<'all' | 'pending' | 'resolved' | 'hidden'>('all');
  ratingFilter = signal<number>(0);

  // Dialog State
  showDetailDialog = false;
  selectedFeedback = signal<FeedbackType | null>(null);

  // Computed filtered feedback
  filteredFeedback = computed(() => {
    return MOCK_FEEDBACK.filter(fb => {
      const matchesSearch = fb.customerName.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        fb.comment.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        fb.productName?.toLowerCase().includes(this.searchTerm().toLowerCase());

      const matchesCategory = this.categoryFilter() === 'all' || fb.category === this.categoryFilter();
      const matchesStatus = this.statusFilter() === 'all' || fb.status === this.statusFilter();
      const matchesRating = this.ratingFilter() === 0 || fb.rating === this.ratingFilter();

      return matchesSearch && matchesCategory && matchesStatus && matchesRating;
    });
  });

  // Actions
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
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

  openDetail(fb: FeedbackType) {
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
}
