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
export class CategoryChart implements OnChanges {
  @Input() series: number[] = [];
  @Input() labels: string[] = [];

  public chartOptions: CategoryChartOptions = this.buildChartOptions(this.series, this.labels);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] || changes['labels']) {
      this.chartOptions = this.buildChartOptions(this.series, this.labels);
    }
  }

  private buildChartOptions(series: number[], labels: string[]): CategoryChartOptions {
    return {
      series,
      chart: {
        type: 'donut',
        height: 300,
      },
      labels,
      colors: [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
        'var(--chart-6)',
        'var(--chart-7)',
      ],
      legend: {
        position: 'bottom',
        fontSize: '14px',
        labels: {
          colors: 'hsl(var(--card-foreground))',
        },
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
  }
}
