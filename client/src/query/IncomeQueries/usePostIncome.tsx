import React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { InputData } from "../types";
import { queryClient } from "../index";
import headers from "../headers";

const addIncome = async (data: InputData) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/income/`, data, {
      headers:headers(),
    })
    .then(() => queryClient.invalidateQueries("income"));
};

const usePostIncome = () => {
  const { mutate, isLoading } = useMutation(addIncome);
  return { mutate, isLoading };
};

export default usePostIncome;
