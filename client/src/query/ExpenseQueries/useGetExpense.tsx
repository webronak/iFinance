import { useQuery } from "react-query";
import { QueryFnParams } from "../types";
import headers from "../headers";
import axios from "axios";

const fetchSingleExpense = async ({ queryKey }: QueryFnParams) => {
  const [id] = queryKey;
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/expense/${id}`,
    {
      headers: headers(),
    }
  );
  return data;
};

const useGetExpense = (id: string) => {
  const response = useQuery(["fetchSingleExpense", id], fetchSingleExpense);
  return response;
};

export default useGetExpense;
