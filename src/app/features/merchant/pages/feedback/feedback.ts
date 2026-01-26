import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { StarRating } from '@/app/shared/components/ui/star-rating/star-rating';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Variant, ChangeType } from '../../../../shared/components/stat-card/stat-card';
import { MessageSquare, Star, Users, Eye, TrendingUp, LucideAngularModule, Trash, Trash2 } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

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
  imports: [StarRating, StatCard, CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  Trash2 = Trash2;
  Eye = Eye;
  searchTerm: string = '';
  ratingFilter: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  feedbackData: FeedbackType[] = [
    { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" },
    { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" },
    { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }
    ,
    { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }

    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }
    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }

    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }

    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }

    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }
    , { id: "101", customer: "សុខ មិនាកា", comment: "ផលិតផលល្អណាស់ គុណភាពខ្ពស់...", category: "ផលិតផលទូទៅ", rating: 5, date: "២០២៥-០១-២០" },
    { id: "102", customer: "សុខ មិនាកា", comment: "សេវាកម្មរហ័សណាស់ អរគុណ...", category: "សេវាកម្ម", rating: 5, date: "២០២៥-០១-១៩" }


  ];

  get filteredData() {
    return this.feedbackData.filter(item => {
      const matchesSearch = item.customer.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.id.includes(this.searchTerm)
        || item.comment.toLowerCase().includes(this.searchTerm.toLowerCase());
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
