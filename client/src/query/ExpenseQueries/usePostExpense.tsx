import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { InputData } from "../types";
import { queryClient } from "../index";

const addExpense = async (data: InputData) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/expense/`, data)
    .then(() => queryClient.invalidateQueries("expense"));
};

const usePostExpense = () => {
  const { mutate, isLoading } = useMutation(addExpense);
  return { mutate, isLoading };
};

export default usePostExpense;
