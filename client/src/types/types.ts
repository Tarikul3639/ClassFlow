
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PlannedTask {
  time: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AcademicPlan {
  summary: string;
  tasks: PlannedTask[];
  tips: string[];
}
