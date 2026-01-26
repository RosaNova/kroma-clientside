import { CategoryChart } from '@/app/shared/components/category-chart/category-chart';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar, Download, Filter, BarChart3, PieChart, FileText, ArrowUpRight, ArrowDownRight, LucideAngularModule, ChartPieIcon } from 'lucide-angular';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexStroke,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
};


export type RevenueChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
type ChangeType = 'positive' | 'negative';
type Variant = 'pink' | 'yellow' | 'green' | 'blue' | 'purple';

export type StatCardType = {
  title: string;                
  value: string;               
  change: string;               
  changeType: ChangeType; 
  icon: any;             
  variant: Variant ; 
};


import { NgApexchartsModule } from 'ng-apexcharts';



interface ReportStatCard {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
  variant: Variant ; 
}

interface ProductCategory {
  name: string;
  value: number;
  color: string;
}

interface TopProduct {
  id: number;
  name: string;
  category: string;
  sold: number;
  revenue: string;
  trend: 'up' | 'down';
}

interface ProductPerformance {
  name: string;
  inStock: number;
  outStock: number;
}

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'app-report',
  imports: [
    FormsModule,
    CommonModule,
    NgApexchartsModule,
    StatCard,
    CategoryChart,
    LucideAngularModule
  ],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report {
  
  ArrowUpRight = ArrowUpRight;
  ArrowDownRight = ArrowDownRight;
  Filter = Filter;
  Download = Download;
  DollarSign = DollarSign;
  ShoppingCart = ShoppingCart;
  TrendingUp = TrendingUp;
   TrendingDown =  TrendingDown;
   Users = Users;
   PieChart = PieChart;
   FileText = FileText;
   BarChart3 = BarChart3;
   
  // Tabs

    activeTab: 'sales' | 'products' | 'customers' = 'sales';

  
  // Date Range
  dateRange: string = 'month';

  // Stat Cards for Sale 
  SaleStats: StatCardType[] = [
      { title: 'ប្រាក់ចំណូល', value: '១២៥,០០០,០០', change: '+12.5%', changeType: 'positive', icon: DollarSign, variant : "blue" },
      { title: 'ការបញ្ជាទិញ', value: '១,២៣៤', change: '+8.2%', changeType: 'positive', icon: ShoppingCart, variant : "green"},
      { title: 'តម្លៃមធ្យម/ការបញ្ជាទិញ', value: '101,300 រៀល', change: '+4.1%', changeType: 'positive', icon: TrendingUp, variant : "yellow"},
      { title: 'អត្រាបញ្ជាទិញបរាជ័យ', value: '២.៣%', change: '-0.5%', changeType: 'negative', icon: TrendingDown, variant :"pink"  }
    ]
  

  // Chart Data
  salesData = [
    { name: 'សប្តាហ៍ ១', sales: 4000, orders: 120, revenue: 2400 },
    { name: 'សប្តាហ៍ ២', sales: 3000, orders: 98, revenue: 2210 },
    { name: 'សប្តាហ៍ ៣', sales: 5000, orders: 145, revenue: 2290 },
    { name: 'សប្តាហ៍ ៤', sales: 4500, orders: 132, revenue: 2000 },
    { name: 'សប្តាហ៍ ៥', sales: 6000, orders: 178, revenue: 2181 },
    { name: 'សប្តាហ៍ ៦', sales: 5500, orders: 165, revenue: 2500 },
  ];

  monthlyRevenueData = [
    { name: 'មករា', revenue: 12000 },
    { name: 'កុម្ភៈ', revenue: 15000 },
    { name: 'មីនា', revenue: 18000 },
    { name: 'មេសា', revenue: 14000 },
    { name: 'ឧសភា', revenue: 22000 },
    { name: 'មិថុនា', revenue: 25000 },
  ];

  productCategoryData = [
    { name: 'គ្រឿងទេស', value: 35, color: '#3B82F6' },
    { name: 'បន្លែ', value: 25, color: '#10B981' },
    { name: 'អនុសាវរីយ៍', value: 20, color: '#F59E0B' },
    { name: 'ផ្សេងៗ', value: 20, color: '#8B5CF6' },
  ];

  topProducts = [
    { id: 1, name: 'ប្រហុកខ្មែរ', category: 'គ្រឿងទេស', sold: 234, revenue: '4,680,000 រៀល', trend: 'up' },
    { id: 2, name: 'ម្រេចកំពត', category: 'គ្រឿងទេស', sold: 189, revenue: '3,780,000 រៀល', trend: 'up' },
    { id: 3, name: 'ត្រី​ប្រឹង', category: 'គ្រឿងទេស', sold: 156, revenue: '2,340,000 រៀល', trend: 'down' },
    { id: 4, name: 'ក្រមា​ខ្មែរ', category: 'អនុសាវរីយ៍', sold: 145, revenue: '2,900,000 រៀល', trend: 'up' },
    { id: 5, name: 'ស្ករ​ត្នោត', category: 'ផ្សេងៗ', sold: 132, revenue: '1,980,000 រៀល', trend: 'up' },
  ];

  topCustomers = [
    { id: 1, name: 'សុខ វិចិត្រ', orders: 45, spent: '8,500,000 រៀល', lastOrder: 'ថ្ងៃនេះ' },
    { id: 2, name: 'ចន្ទ សុភា', orders: 38, spent: '7,200,000 រៀល', lastOrder: '១ ថ្ងៃមុន' },
    { id: 3, name: 'ពៅ សុខុម', orders: 32, spent: '5,800,000 រៀល', lastOrder: '២ ថ្ងៃមុន' },
    { id: 4, name: 'សារ៉ា មុន្នី', orders: 28, spent: '4,900,000 រៀល', lastOrder: '៣ ថ្ងៃមុន' },
    { id: 5, name: 'គង់ វិសាល', orders: 25, spent: '4,200,000 រៀល', lastOrder: '៥ ថ្ងៃមុន' },
  ];

  // Expose Math for template (optional)
  Math = Math;


   // Weekly sales
  public saleChart: ChartOptions = {
      series: [
        {
          name: 'Sales',
          data: [4000, 3000, 5000, 4500, 6000, 5500]
        }
      ],
      chart: {
      type: 'bar',
      height: 280,
      toolbar: { show: false }
    },
  
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '70%'
        }
      },
  
      xaxis: {
        categories: ['សប្តាហ៍ ១', '២', '៣', '៤', '៥', '៦']
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `$${val / 1000}k`
        }
      },
  
      colors: ['var(--primary)']
    };


  // Monthly revenue
revenueChart : RevenueChartOptions = {
  series: [
    {
      name: 'Revenue',
      data: [10000, 25000, 35880, 40000, 50000]
    }
  ],

  chart: {
    type: 'area',
    height: 350
  },

  xaxis: {
    categories: ['មករា', 'កុម្ភះ', 'មីនា', 'មេសា', 'ឪសភា',"មិថុនា"]
  },

  dataLabels: {
    enabled: true
  },

  fill: {
    opacity: 5
  },

  tooltip: {
    enabled: true
  }
};



  ProductStats: ReportStatCard[] = [
    { title: 'ផលិតផលសរុប', value: '៥៨០', change: '+24', changeType: 'positive', icon: Package, variant : "blue" },
    { title: 'ផលិតផលលក់ដាច់', value: '១,៤៥៦', change: '+18.3%', changeType: 'positive', icon: TrendingUp, variant : "pink" },
    { title: 'ផលិតផលអស់ស្តុក', value: '២០', change: '-5', changeType: 'negative', icon: TrendingDown, variant : "purple" },
    { title: 'ប្រភេទផលិតផល', value: '១២', change: '+2', changeType: 'positive', icon: PieChart, variant : "yellow" }
  ];

  productPerformanceData = [
  {
    name: 'Product 1',
    series: [
      { name: 'In Stock', value: 50 },
      { name: 'Out Stock', value: 10 }
    ]
  },
  {
    name: 'Product 2',
    series: [
      { name: 'In Stock', value: 30 },
      { name: 'Out Stock', value: 20 }
    ]
  },
  {
    name: 'Product 3',
    series: [
      { name: 'In Stock', value: 20 },
      { name: 'Out Stock', value: 5 }
    ]
  }
];


}
