import { FormDataType } from "../types";

export interface DashboardFormProps {
  editFieldId: string;
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  data: FormDataType;
  isLoading: boolean;
  handleTagClick: (tagName: string) => void;
  tags: string[];
}
