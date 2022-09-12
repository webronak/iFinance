import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../index";
import headers from "../headers";
import axios from "axios";

const deleteExpense = async (id: string) => {
  const response = await axios
    .delete(`${process.env.REACT_APP_API_URL}/expense/${id}`, {
      headers: headers(),
    })
    .then(() => queryClient.invalidateQueries("expense"));

    return response;
};

const useDeleteExpense = () => {
  const actions = useMutation(deleteExpense);
  return actions;
};

export default useDeleteExpense;
