export interface QueryFnParams {
  queryKey: string | unknown[];
}

export interface InputData {
  title: string;
  description: string;
  amount: number;
  id?: string;
  [key: string]: any;
}

export interface UserSignupData {
  email: string;
  password: string;
}
