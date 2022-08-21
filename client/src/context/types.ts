import { ReactNode } from "react";

import { SnackbarOrigin } from "@mui/material/Snackbar";

export interface Props {
  children: ReactNode;
}
export interface SnackbarStateType extends SnackbarOrigin {
  open: boolean;
  message: string;
}

export interface StateType {
  token: string;
  email: string;
}

export interface ContextStateType {
  userData: StateType;
  snackbarState: SnackbarStateType;
  clearUser: () => void;
  handleCloseSnackbar: () => void;
  addUser: (data: StateType) => void;
  triggerSnackbar: (message: string) => void;
}
