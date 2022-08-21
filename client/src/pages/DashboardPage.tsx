import React from "react";
import { Container } from "@mui/material";
import DashboardBody from "components/dashboard";
import { Navigate } from "react-router-dom";
const DashboardPage: React.FC = () => {

  return (
    <Container maxWidth="xl">
      <DashboardBody />
    </Container>
  );
};

export default DashboardPage;
