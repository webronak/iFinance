import React, { useEffect, useContext } from "react";
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
import useLoginUser from "query/userQueries/useLoginUser";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { addUser, triggerSnackbar } = useContext(AuthContext);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const {
    mutate: loginMutation,
    isLoading,
    status: loginStatus,
  } = useLoginUser();

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

  const handleSubmit = () => {
    const { showPassword, ...rest } = values;
    loginMutation(rest, {
      onSuccess: async (data) => {
        triggerSnackbar("Logged in successfully!");
        addUser(data);
        navigate("/dashboard/incomes", { replace: true });
      },
    });
  };

  const handleClickShowPassword = () => {
    setValues((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
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
          Login
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
            type={values?.showPassword ? "text" : "password"}
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
          Log in
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
