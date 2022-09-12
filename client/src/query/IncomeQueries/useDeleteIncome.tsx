import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../index";
import { QueryFnParams } from "../types";
import axios from "axios";
import headers from "../headers";

const deleteIncome = async (id: string) => {
  const response = await axios
    .delete(`${process.env.REACT_APP_API_URL}/income/${id}`, {
      headers: headers(),
    })
    .then(() => queryClient.invalidateQueries("income"));
};

const useDeleteIncome = () => {
  const actions = useMutation(deleteIncome);
  return actions;
};

export default useDeleteIncome;
