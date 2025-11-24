import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import "./index.css";

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Check if already logged in
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (token) {
    return <Navigate to="/app" replace />;
  }
  
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={qc}>
        <ErrorBoundary>
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            <Route 
              path="/app" 
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              } 
            />
            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
