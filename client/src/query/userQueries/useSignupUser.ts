import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { UserSignupData } from "../types";

const handleSignup = async (data: UserSignupData) => {

  axios
    .post(`${process.env.REACT_APP_API_URL}/user/signup`, data)
    .then(({ data }) => {
      const { token, email } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    });
};

const useSignupUser = () => {
  return useMutation(handleSignup);
};

export default useSignupUser;
