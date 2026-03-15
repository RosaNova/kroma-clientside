import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexStroke,
} from 'ng-apexcharts';
import { StoreCategoriesService } from '@/app/features/super-admin/pages/store-category/service/store-categories-service';

export type CategoryChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-category-chart',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.css',
})
export class CategoryChart {

  // public chartOptions: CategoryChartOptions = {
  //   series: [35, 25, 20, 12, 8],
  //   chart: {
  //     type: 'donut',
  //     height: 300,
  //   },

  //   labels: ['អេឡិចត្រូនិក', 'សម្លៀកបំពាក់', 'ម្ហូបអាហារ', 'គ្រឿងសម្អាង', 'ផ្សេងៗ'],

  //   colors: [
  //     'var(--chart-1)',
  //     'var(--chart-2)',
  //     'var(--chart-3)',
  //     'var(--chart-4)',
  //     'var(--chart-5)',
  //     'var(--chart-6)',
  //     'var(--chart-7)',
  //     'var(--chart-8)',
  //   ],

  //   legend: {
  //     position: 'bottom',
  //     fontSize: '14px',
  //     labels: {
  //       colors: 'hsl(var(--card-foreground))',
  //     },
  //     fontFamily: 'Battambang',
  //   },

  //   dataLabels: {
  //     enabled: false,
  //   },

  //   stroke: {
  //     width: 2,
  //   },

  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           height: 260,
  //         },
  //       },
  //     },
  //   ],
  // };

  public chartOptions: CategoryChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 300,
    },
    labels: [],
    colors: [
      'var(--chart-1)',
      'var(--chart-2)',
      'var(--chart-3)',
      'var(--chart-4)',
      'var(--chart-5)',
      'var(--chart-6)',
      'var(--chart-7)',
      'var(--chart-8)',
    ],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: 'hsl(var(--card-foreground))',
      },
      fontFamily: 'Battambang',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 260,
          },
        },
      },
    ],
  };
  constructor(private storeCategoryService: StoreCategoriesService) {
    this.getStoreCategories();
  }
  async getStoreCategories() {
    try {
      const res = await this.storeCategoryService.getOverallForDashboard();
      if (res) {
        const list = res.list;
        this.chartOptions = {
          ...this.chartOptions,
          series: list.map((item: any) => item.store_count),
          labels: list.map((item: any) => item.name),
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
