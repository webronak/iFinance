import React from "react";
import { useQuery } from "react-query";
import { QueryFnParams } from "../types";
import axios from "axios";
import headers from "../headers";

const fetchSingleIncome = async ({ queryKey }: QueryFnParams) => {
  const [key, id] = queryKey;
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/income/${id}`,
    {
      headers:headers(),
    }
  );
  return data;
};

const useGetIncome = (id: string) => {
  const response = useQuery(["fetchSingleIncome", id], fetchSingleIncome);
  return response;
};

export default useGetIncome;
