import React, { useEffect, useContext } from "react";
import { BrandName, NavbarContainer, StyleLink, LogoutButton } from "./styles";
import {
  ToggleButtonGroup,
  ButtonGroup,
  Button,
  ToggleButton,
} from "@mui/material";
import AuthContext from "context/AuthContext";
import {
  dashboardIncomeRoute,
  dashboardExpensesRoute,
  dashboardInvestmentsRoute,
  dashboardRoute,
  userSignupRoute,
  userLoginRoute,
} from "routes/pageRoutes";
import { useNavigate } from "react-router-dom";
// import  {useLoginUser} from "query/userQueries/useLoginUser"

const Navbar: React.FC = () => {
  const [formSelect, setformSelect] = React.useState<string | null>("login");
  const { userData, clearUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    clearUser();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setformSelect(newAlignment);
  };
  return (
    <NavbarContainer maxWidth="xl">
      <BrandName>iFinance</BrandName>

      {userToken ? (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <StyleLink to={dashboardRoute}>
            <Button>Over All</Button>
          </StyleLink>
          <StyleLink to={dashboardIncomeRoute}>
            <Button>Incomes</Button>
          </StyleLink>
          <StyleLink to={dashboardExpensesRoute}>
            <Button>Expenses</Button>
          </StyleLink>
          <StyleLink to={dashboardInvestmentsRoute}>
            <Button>Investments</Button>
          </StyleLink>
        </ButtonGroup>
      ) : (
        <ToggleButtonGroup
          value={formSelect}
          onChange={handleAlignment}
          aria-label="form select"
        >
          <StyleLink to={userSignupRoute}>
            <ToggleButton value="sign up" aria-label="sign up">
              sign up
            </ToggleButton>
          </StyleLink>
          <StyleLink to={userLoginRoute}>
            <ToggleButton value="login" aria-label="login">
              login
            </ToggleButton>
          </StyleLink>
        </ToggleButtonGroup>
      )}

      {userData?.token && (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
