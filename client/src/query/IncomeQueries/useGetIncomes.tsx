import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { QueryFnParams } from "../types";
import headers from "../headers";

const fetchAllIncomes = async ({ queryKey }: QueryFnParams) => {
  const [key] = queryKey;
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${key}/`, {
    headers:headers(),
  });
  return data;
};

const useGetIncomes = () => {
  const { data, isLoading, refetch } = useQuery(["income"], fetchAllIncomes);
  return {
    data,
    isLoading,
    refetch,
  };
};

export default useGetIncomes;
