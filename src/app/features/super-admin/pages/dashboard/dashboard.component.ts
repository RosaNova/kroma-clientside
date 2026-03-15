import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { SaleChart } from '@/app/shared/components/sale-chart/sale-chart.component';
import { CategoryChart } from '@/app/shared/components/category-chart/category-chart.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  LucideAngularModule,
  DollarSign,
  Users,
  TrendingUp,
  Store,
  Activity,
} from 'lucide-angular';
import { LoadingSpinner } from '@/app/shared/components/ui/loading-spinner/loading-spinner.component';
import { LoadingService } from '@/app/core/services/loading.service';
import { MerchantService } from '../merchant/services/merchant-service';
import { StatCardType } from '@/app/core/models/ui.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StatCard,
    SaleChart,
    CategoryChart,
    LoadingSpinner,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class Dashboard implements OnInit {
  private loadingService = inject(LoadingService);
  private merchantService = inject(MerchantService);

  isLoading$ = this.loadingService.isLoading$;

  DollarSign = DollarSign;
  Users = Users;
  TrendingUp = TrendingUp;
  Store = Store;
  Activity = Activity;

  SUPER_ADMIN_DASHBOARD_STATS: StatCardType[] = [
    {
      title: 'ប្រាក់ចំណូលសរុបពីប្រព័ន្ធ',
      value: '$0',
      change: '0% ពីខែមុន',
      changeType: 'positive',
      icon: DollarSign,
      variant: 'pink',
    },
    {
      title: 'អាជីវករសរុប',
      value: '0',
      change: '0% ពីខែមុន',
      changeType: 'positive',
      icon: Store,
      variant: 'yellow',
    },
    {
      title: 'អតិថិជនសរុប',
      value: '0',
      change: '0% ពីខែមុន',
      changeType: 'positive',
      icon: Users,
      variant: 'green',
    },
    {
      title: 'អតិថិជនថ្មីខែនេះ',
      value: '0',
      change: '0% ពីខែមុន',
      changeType: 'positive',
      icon: TrendingUp,
      variant: 'blue',
    },
  ];

  monthlyRevenueCategories: string[] = [
    'មករា',
    'កុម្ភៈ',
    'មីនា',
    'មេសា',
    'ឧសភា',
    'មិថុនា',
    'កក្កដា',
    'សីហា',
    'កញ្ញា',
    'តុលា',
    'វិច្ឆិកា',
    'ធ្នូ',
  ];
  monthlyRevenueSeriesData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  categoryChartLabels: string[] = [];
  categoryChartSeries: number[] = [];

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getTotalSystemRevenue(),
      this.getDashboardStatsMerchant(),
      this.getTotalCustomer(),
      this.getTopMerchants(),
      this.getMonthlyRevenueReport(),
      this.getCategoryDistribution(),
    ]);
  }

  private formatKhmerChange(change: any, changeType: any): string {
    const raw = String(change ?? '0%').trim() || '0%';
    return changeType === 'negative' ? `${raw} ថយចុះពីខែមុន` : `${raw} ពីខែមុន`;
  }

  private formatCurrency(value: number): string {
    const numericValue = Number(value ?? 0);
    return `$${numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  private async getTotalSystemRevenue(): Promise<void> {
    try {
      // response:
      // { success:true, data:{ title, value, change, changeType, raw } }
      const res: any = await this.merchantService.getTotalSystemRevenue();
      const data = res?.data ?? {};

      const value = this.formatCurrency(Number(data?.value ?? 0));
      const changeType = data?.changeType === 'negative' ? 'negative' : 'positive';
      const change = this.formatKhmerChange(data?.change, changeType);

      this.SUPER_ADMIN_DASHBOARD_STATS[0] = {
        ...this.SUPER_ADMIN_DASHBOARD_STATS[0],
        value,
        change,
        changeType,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getDashboardStatsMerchant() {
    try {
      const res: any = await this.merchantService.getDashboardStatsMerchant();
      const data = res?.data ?? res;

      const totalMerchant = data?.totalMerchant ?? {};
      const totalNewMerchantThisMonth = data?.totalNewMerchantThisMonth ?? {};

      // keep index 1 for merchant total
      this.SUPER_ADMIN_DASHBOARD_STATS[1] = {
        ...this.SUPER_ADMIN_DASHBOARD_STATS[1],
        value: String(totalMerchant?.value ?? 0),
        change: this.formatKhmerChange(totalMerchant?.change, totalMerchant?.changeType),
        changeType: totalMerchant?.changeType === 'negative' ? 'negative' : 'positive',
      };

      // keep index 3 for new merchants this month
      this.SUPER_ADMIN_DASHBOARD_STATS[3] = {
        ...this.SUPER_ADMIN_DASHBOARD_STATS[3],
        value: String(totalNewMerchantThisMonth?.value ?? 0),
        change: this.formatKhmerChange(
          totalNewMerchantThisMonth?.change,
          totalNewMerchantThisMonth?.changeType,
        ),
        changeType: totalNewMerchantThisMonth?.changeType === 'negative' ? 'negative' : 'positive',
      };
    } catch (e) {
      console.log(e);
    }
  }

  topMerchants: Array<{
    name: string;
    owner: string;
    sales: string;
    status: string;
    performance: string;
  }> = [];

  private async getTopMerchants(): Promise<void> {
    try {
      // response: { success: true, list: [{ name, owner, status, sales, performance }] }
      const res: any = await this.merchantService.getTopMerchants();
      const list = Array.isArray(res?.list) ? res.list : [];

      this.topMerchants = list.map((item: any) => ({
        name: item?.name ?? '',
        owner: item?.owner ?? '',
        status: item?.status ?? 'active',
        sales: this.formatCurrency(Number(item?.sales ?? 0)),
        performance: item?.performance ?? '+0%',
      }));
    } catch (e) {
      console.log(e);
      this.topMerchants = [];
    }
  }
  private async getTotalCustomer(): Promise<void> {
    try {
      const res: any = await this.merchantService.getTotalCustomer();
      const data = res?.data ?? {};

      this.SUPER_ADMIN_DASHBOARD_STATS[2] = {
        ...this.SUPER_ADMIN_DASHBOARD_STATS[2],
        value: String(data?.value ?? 0),
        change: this.formatKhmerChange(data?.change, data?.changeType),
        changeType: data?.changeType === 'negative' ? 'negative' : 'positive',
      };
    } catch (e) {
      console.log(e);
    }
  }

  onRevenueYearTypeChange(type: 'current' | 'previous'): void {
    this.selectedRevenueYearType = type;
    this.getMonthlyRevenueReport();
  }

  selectedRevenueYearType: 'current' | 'previous' = 'current';
  currentChartYear = new Date().getFullYear();

  private async getMonthlyRevenueReport(): Promise<void> {
    try {
      const res: any = await this.merchantService.getMonthlyRevenueReport();
      const data = res?.data ?? {};
      const nowYear = new Date().getFullYear();

      this.currentChartYear = Number(data?.year ?? nowYear);

      this.monthlyRevenueCategories = Array.isArray(data?.categories)
        ? data.categories
        : this.monthlyRevenueCategories;

      this.monthlyRevenueSeriesData = Array.isArray(data?.seriesData)
        ? data.seriesData.map((v: any) => Number(v ?? 0))
        : this.monthlyRevenueSeriesData;

      // infer selector from API year
      this.selectedRevenueYearType = this.currentChartYear < nowYear ? 'previous' : 'current';
    } catch (e) {
      console.log(e);
    }
  }

  private async getCategoryDistribution(): Promise<void> {
    try {
      const res: any = await this.merchantService.getCategoryDistribution();
      const data = res?.data ?? {};
      this.categoryChartLabels = Array.isArray(data?.labels) ? data.labels : [];
      this.categoryChartSeries = Array.isArray(data?.series)
        ? data.series.map((v: any) => Number(v ?? 0))
        : [];
    } catch (e) {
      console.log(e);
    }
  }
}
