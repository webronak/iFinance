export interface DashboardTableProps {
  setEditFieldId: (id: string) => void;
}

export interface FormDataType {
  title: string;
  description: string;
  amount: number;
  tag: string;
  [key: string]: any;
}
