import React from "react";
import Navbar from "components/common/navbar/Navbar";
import { DashboardPage, LoginPage, SignupPage } from "pages";
import { QueryClientProvider } from "react-query";
import { queryClient } from "query";
import { AuthContextProvider } from "context/AuthContext";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route
                path="/dashboard/:dashboardType"
                element={<DashboardPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
