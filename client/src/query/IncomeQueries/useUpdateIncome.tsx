import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { InputData } from "../types";
import { queryClient } from "../index";

const updateIncome = async (data: InputData) => {
  const { id } = data;
  delete data["id"];
  const response = await axios
    .patch(`${process.env.REACT_APP_API_URL}/income/${id}`, data)
    .then(() => queryClient.invalidateQueries("income"));
};

const useUpdateIncome = () => {
  const { mutate, isLoading } = useMutation(updateIncome);
  return { mutate, isLoading };
};

export default useUpdateIncome;
