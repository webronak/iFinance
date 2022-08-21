import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { InputData } from "../types";
import { queryClient } from "../index";

const updateExpense = async (data: InputData) => {
  const { id } = data;
  delete data["id"];
  const response = await axios
    .patch(`${process.env.REACT_APP_API_URL}/expense/${id}`, data)
    .then(() => queryClient.invalidateQueries("expense"));
};

const useUpdateExpense = () => {
  const { mutate, isLoading } = useMutation(updateExpense);
  return { mutate, isLoading };
};

export default useUpdateExpense;
