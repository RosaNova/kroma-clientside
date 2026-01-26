import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions
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
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './sale-chart.html',
  styleUrl: './sale-chart.css',
})
export class SaleChart {
  
 public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Sales',
        data: [4000, 3000, 5000, 4500, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 8500]
      }
    ],

    chart: {
      type: 'bar',        // ✅ now correctly typed as ChartType
      height: 300,
      toolbar: {
        show: false
      }
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '70%'
      }
    },

    xaxis: {
      categories: [
        'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា',
        'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា',
        'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
      ]
    },

    yaxis: {
      labels: {
        formatter: (val: number) => `$${val / 1000}k`
      }
    },

    colors: ['var(--primary)']
  };
}
