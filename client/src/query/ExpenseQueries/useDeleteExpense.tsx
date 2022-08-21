import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../index";
import { QueryFnParams } from "../types";
import axios from "axios";

const deleteExpense = async (id: string) => {
  const response = await axios
    .delete(`${process.env.REACT_APP_API_URL}/expense/${id}`)
    .then(() => queryClient.invalidateQueries("expense"));
};

const useDeleteExpense = () => {
  const actions = useMutation(deleteExpense);
  return actions;
};

export default useDeleteExpense;
