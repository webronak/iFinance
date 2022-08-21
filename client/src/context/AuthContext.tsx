import {
  createContext,
  forwardRef,
  FC,
  useEffect,
  useState,
  useContext,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Props, SnackbarStateType, StateType, ContextStateType } from "./types";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthContext = createContext<ContextStateType>({
  userData: { token: "", email: "" },
  snackbarState: {
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  },
  addUser: () => {
    return;
  },
  clearUser: () => {
    return;
  },
  handleCloseSnackbar: () => {
    return;
  },
  triggerSnackbar: () => {
    return;
  },
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<StateType>({ token: "", email: "" });
  const [snackbarState, setSnackbarState] = useState<SnackbarStateType>({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  });
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    if (userToken && userEmail) {
      setUserData({
        token: userToken,
        email: userEmail,
      });
    }
  }, []);

  const addUser = (data: StateType) => {
    setUserData(data);
  };
  const clearUser = () => {
    setUserData({ token: "", email: "" });
  };
  const handleCloseSnackbar = () => {
    setSnackbarState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const triggerSnackbar = (message: string) => {
    setSnackbarState((prev) => ({
      ...prev,
      open: true,
      message,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        addUser,
        clearUser,
        snackbarState,
        handleCloseSnackbar,
        triggerSnackbar,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        autoHideDuration={6000}
        open={snackbarState.open}
        onClose={handleCloseSnackbar}
        key={snackbarState.vertical + snackbarState.horizontal}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export default AuthContext;
