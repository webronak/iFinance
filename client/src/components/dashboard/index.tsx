import React, { useState } from "react";
import { DashboardWrapper } from "./styles";
import IncomeDashboard from "./IncomeDashboard";
import { useParams } from "react-router-dom";
import ExpenseDashboard from "./ExpenseDashboard";

const DashboardBody = () => {
  const { dashboardType } = useParams();
  return (
    <DashboardWrapper>
      {dashboardType === "incomes" && <IncomeDashboard />}
      {dashboardType === "expenses" && <ExpenseDashboard />}
    </DashboardWrapper>
  );
};

export default DashboardBody;
