import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

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

                    <Routes>

                        <Route path="/" element={<Dashboard />} />

                        <Route path="/analytics" element={<Analytics />} />

                        <Route
                            path="/history"
                            element={<PredictionHistory />}
                        />

                        <Route path="/database" element={<Database />} />

                        <Route path="/copilot" element={<AICopilotPage />} />

                    </Routes>

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