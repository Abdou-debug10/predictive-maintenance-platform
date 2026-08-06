import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectrouter";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import PredictionHistory from "./pages/PredictionHistory";
import Database from "./pages/Database";
import AICopilotPage from "./pages/AICopilotPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (

        <BrowserRouter>

            <div
                style={{
                    display: "flex",
                    minHeight: "100vh",
                    background: "#eef2f7"
                }}
            >

                <Navbar />

                <div
                    style={{
                        flex: 1,
                        overflowX: "hidden",
                        padding: "20px"
                    }}
                >

               <Route 
    path="/" 
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>


<Route 
    path="/analytics" 
    element={
        <ProtectedRoute>
            <Analytics />
        </ProtectedRoute>
    }
/>


<Route 
    path="/history" 
    element={
        <ProtectedRoute>
            <PredictionHistory />
        </ProtectedRoute>
    }
/>


<Route 
    path="/database" 
    element={
        <ProtectedRoute>
            <Database />
        </ProtectedRoute>
    }
/>


<Route 
    path="/copilot" 
    element={
        <ProtectedRoute>
            <AICopilotPage />
        </ProtectedRoute>
    }
/>

                </div>

            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </BrowserRouter>

    );

}

export default App;