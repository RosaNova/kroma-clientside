import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  selector: 'app-sale-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './sale-chart.component.html',
  styleUrl: './sale-chart.component.css',
})
export class SaleChart implements OnChanges {
  @Input() seriesData: number[] = [];
  @Input() categories: string[] = [];
  @Input() selectedYearType: 'current' | 'previous' = 'current';

  @Output() yearTypeChange = new EventEmitter<'current' | 'previous'>();

  private readonly defaultCategories = [
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
  private readonly defaultSeriesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public chartOptions: ChartOptions = {
    series: [{ name: '', data: this.defaultSeriesData }],
    chart: { type: 'bar', height: 300, toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 10, columnWidth: '70%' } },
    xaxis: { categories: this.defaultCategories },
    yaxis: { labels: { formatter: (val: number) => `$${val / 1000}k` } },
    colors: ['var(--primary)'],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seriesData'] || changes['categories']) {
      const data = this.seriesData?.length ? this.seriesData : this.defaultSeriesData;
      const cats = this.categories?.length ? this.categories : this.defaultCategories;

      this.chartOptions = {
        ...this.chartOptions,
        series: [{ name: 'Sales', data }],
        xaxis: { ...this.chartOptions.xaxis, categories: cats },
      };
    }
  }

  onYearTypeChange(value: 'current' | 'previous'): void {
    this.selectedYearType = value;
    this.yearTypeChange.emit(value);
  }
}
