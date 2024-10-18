import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import User from "./components/User";
import RideMonitoring from "./components/RideMonitoring";
import Reports from "./components/Reports";
import IssueManagement from "./components/IssueManagement";
import PolicyManagement from "./components/PolicyManagement";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Login />}
            />
            <Route
              path="/user"
              element={isAuthenticated ? <User /> : <Navigate to="/" />}
            />
            <Route
              path="/ride-monitoring"
              element={
                isAuthenticated ? <RideMonitoring /> : <Navigate to="/" />
              }
            />
            <Route
              path="/reports"
              element={isAuthenticated ? <Reports /> : <Navigate to="/" />}
            />
            <Route
              path="/issue-management"
              element={
                isAuthenticated ? <IssueManagement /> : <Navigate to="/" />
              }
            />
            <Route
              path="/policy-management"
              element={
                isAuthenticated ? <PolicyManagement /> : <Navigate to="/" />
              }
            />
            <Route
              path="/dashboard" // Corrected this path to lowercase
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const Root = () => (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

export default Root;
