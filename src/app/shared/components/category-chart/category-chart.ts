import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexStroke
} from 'ng-apexcharts';

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
  imports: [ NgApexchartsModule , CommonModule],
  templateUrl: './category-chart.html',
  styleUrl: './category-chart.css',
})
export class CategoryChart {
  public chartOptions: CategoryChartOptions = {
    series: [35, 25, 20, 12, 8],
    chart: {
      type: 'donut',
      height: 300
    },

    labels: [
      'អេឡិចត្រូនិក',
      'សម្លៀកបំពាក់',
      'ម្ហូបអាហារ',
      'គ្រឿងសម្អាង',
      'ផ្សេងៗ'
    ],

    colors: [
      'var(--chart-1)',
      'var(--chart-2)',
      'var(--chart-3)',
      'var(--chart-4)',
      'var(--chart-5)'
    ],

    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: 'hsl(var(--card-foreground))'
      }
    },

    dataLabels: {
      enabled: false
    },

    stroke: {
      width: 2
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 260
          }
        }
      }
    ]
  };
}
