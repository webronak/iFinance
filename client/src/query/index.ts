import { QueryClient } from "react-query";

export const queryClient = new QueryClient();
export { default as useGetIncomes } from "./IncomeQueries/useGetIncomes";
export { default as usePostIncome } from "./IncomeQueries/usePostIncome";
export { default as useDeleteIncome } from "./IncomeQueries/useDeleteIncome";
export { default as useGetIncome } from "./IncomeQueries/useGetIncome";
export { default as useUpdateIncome } from "./IncomeQueries/useUpdateIncome";
export { default as useGetExpenses } from "./ExpenseQueries/useGetExpenses";
export { default as usePostExpense } from "./ExpenseQueries/usePostExpense";
export { default as useUpdateExpense } from "./ExpenseQueries/useUpdateExpense";
export { default as useGetExpense } from "./ExpenseQueries/useGetExpense";
export { default as useDeleteExpense } from "./ExpenseQueries/useDeleteExpense";
export { default as useLoginUser } from "./userQueries/useLoginUser";
export { default as useSignupUser } from "./userQueries/useSignupUser";
