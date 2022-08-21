import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { QueryFnParams } from "../types";

const fetchAllExpenses = async ({ queryKey }: QueryFnParams) => {
  const [key] = queryKey;
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${key}/`);
  return data;
};

const useGetExpenses = () => {
  const { data, isLoading, refetch } = useQuery(["expense"], fetchAllExpenses);
  return {
    data,
    isLoading,
    refetch,
  };
};

export default useGetExpenses;
