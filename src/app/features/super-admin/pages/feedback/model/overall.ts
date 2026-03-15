export interface Overall {
  total_feedback: number;
  calculate_average: Average;
}
interface Average {
  average_star: number;
  positive_count: number;
  negative_count: number;
  positive_proportion: number;
  negative_proportion: number;
}
