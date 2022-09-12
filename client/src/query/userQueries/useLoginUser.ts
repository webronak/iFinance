import React, { useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { UserSignupData } from "../types";
import AuthContext from "context/AuthContext";

const handleLogin = async (data: UserSignupData) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/user/login`, data)
    .then(({ data }) => {
      return data;
    });
};

const useLoginUser = () => {
  return useMutation(handleLogin);
};

export default useLoginUser;
