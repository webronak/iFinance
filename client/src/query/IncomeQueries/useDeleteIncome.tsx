import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../index";
import { QueryFnParams } from "../types";
import axios from "axios";

const deleteIncome = async (id: string) => {
  const response = await axios
    .delete(`${process.env.REACT_APP_API_URL}/income/${id}`)
    .then(() => queryClient.invalidateQueries("income"));
};

const useDeleteIncome = () => {
  const actions = useMutation(deleteIncome);
  return actions;
};

export default useDeleteIncome;
