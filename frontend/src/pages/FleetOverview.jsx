import { useEffect, useState } from "react";
import PredictionForm from "../components/PredictionForm";
import StatCard from "../components/StatCard";
import PredictionTable from "../components/PredictionTable";
import AnalyticsCharts from "../components/AnalyticsCharts";
import AICopilot from "../components/AICopilot";
import HealthIndicators from "../components/HealthIndicators";
import RecentActivity from "../components/RecentActivity";
import { getPredictions } from "../utils/api";
import { generatePDF } from "../utils/pdfReport";

function FleetOverview() {
    const [predictions, setPredictions] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");
    useEffect(() => { loadPredictions(); }, []);
    async function loadPredictions() { try { const data = await getPredictions(); setPredictions(data); setLastUpdated(new Date().toLocaleTimeString()); } catch (e) { console.log(e); } }
    function exportCSV() { const headers = ["ID", "Prediction", "Confidence", "Created At"]; const rows = predictions.map(p => [p.id, p.prediction, p.confidence, p.created_at]); const csv = [headers, ...rows].map(r => r.join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "prediction_history.csv"; a.click(); URL.revokeObjectURL(url); }
    const healthyCount = predictions.filter(p => p.prediction === "Machine Healthy").length;
    const failureCount = predictions.filter(p => p.prediction === "Machine Failure Predicted").length;
    const averageConfidence = predictions.length ? (predictions.reduce((s, p) => s + Number(p.confidence), 0) / predictions.length).toFixed(2) : "0.00";
    return (<div style={{ padding: "32px", background: "#F8FAFC", minHeight: "100vh" }}>
        <div style={{ background: "#fff", padding: "30px 36px", borderRadius: "18px", boxShadow: "0 4px 18px rgba(15,23,42,.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
            <div><h1 style={{ margin: 0, fontSize: "32px", color: "#0F172A", fontWeight: 700 }}>Predictive Maintenance Platform</h1><p style={{ marginTop: "10px", color: "#64748B", fontSize: "15px", lineHeight: "24px", maxWidth: "700px" }}>Monitor industrial assets, predict equipment failures using machine learning, analyze operational health, and support maintenance decisions through explainable AI.</p></div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={loadPredictions}>Refresh Data</button>
                <button onClick={exportCSV}>Export CSV</button>
                <button onClick={() => generatePDF(predictions)}>Generate Report</button>
            </div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px", marginBottom: "28px" }}>
            <StatCard title="Total Predictions" value={predictions.length} color="#2563EB" />
            <StatCard title="Healthy Machines" value={healthyCount} color="#16A34A" />
            <StatCard title="Failure Predictions" value={failureCount} color="#DC2626" />
            <StatCard title="Average Confidence" value={`${averageConfidence}%`} color="#7C3AED" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px", color: "#64748B", fontSize: "14px" }}><span>System Status</span><span>Last Updated: {lastUpdated}</span></div>
        <PredictionForm onPrediction={loadPredictions} />
        <HealthIndicators predictions={predictions} />
        <AnalyticsCharts predictions={predictions} />
        <RecentActivity predictions={predictions} />
        <AICopilot predictions={predictions} />
        <PredictionTable predictions={predictions} />
    </div>);
}
export default FleetOverview;