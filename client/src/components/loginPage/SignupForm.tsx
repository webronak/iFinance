import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff, LockOpen } from "@mui/icons-material";
import { SignupDataType } from "./types";
import useSignupUser from "query/userQueries/useSignupUser";
import { Navigate } from "react-router-dom";

const SignupForm = () => {
  const userToken = localStorage.getItem("token");

  const [values, setValues] = React.useState<SignupDataType>({
    email: "",
    password: "",
    showPassword: false,
  });

  const { mutate: signupMutation, isLoading } = useSignupUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = () => {
    const { showPassword, ...rest } = values;
    signupMutation(rest);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sign up
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          name="Email"
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={handleEmailChange}
        />
        <FormControl
          sx={{ m: "0.5rem 0px 2rem 0px", width: "100%" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Password"
            name="Password"
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
        </FormControl>
        <LoadingButton
          variant="contained"
          endIcon={<LockOpen />}
          onClick={handleSubmit}
          loading={isLoading}
          loadingPosition="end"
        >
          Sign up
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
