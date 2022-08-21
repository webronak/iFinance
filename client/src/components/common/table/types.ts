export interface Props {
  data: TableData[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export interface TableData {
  title?: string;
  description?: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}
