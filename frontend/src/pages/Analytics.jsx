import AnalyticsCharts from "../components/AnalyticsCharts";
import { useEffect, useState } from "react";
import { getPredictions } from "../utils/api";

function Analytics() {

    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        loadPredictions();
    }, []);

    async function loadPredictions() {
        try {
            const data = await getPredictions();
            setPredictions(data);
        } catch (err) {
            console.log(err);
        }
    }

    const healthy = predictions.filter(
        p => p.prediction === "Machine Healthy"
    ).length;

    const failure = predictions.filter(
        p => p.prediction === "Machine Failure Predicted"
    ).length;

    const avgConfidence =
        predictions.length > 0
            ? (
                predictions.reduce(
                    (sum, p) => sum + Number(p.confidence),
                    0
                ) / predictions.length
            ).toFixed(2)
            : 0;

    return (

        <div
            style={{
                padding: "30px",
                background: "#eef2f7",
                minHeight: "100vh",
                maxWidth: "1400px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    color: "#111827",
                    marginBottom: "10px"
                }}
            >
                Analytics Dashboard
            </h1>

            <p
                style={{
                    color: "#6b7280",
                    marginBottom: "30px"
                }}
            >
                AI-powered prediction analytics and machine health insights.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <Card
                    title="Total Predictions"
                    value={predictions.length}
                    color="#2563eb"
                />

                <Card
                    title="Healthy Machines"
                    value={healthy}
                    color="#16a34a"
                />

                <Card
                    title="Failure Predictions"
                    value={failure}
                    color="#dc2626"
                />

                <Card
                    title="Average Confidence"
                    value={`${avgConfidence}%`}
                    color="#7c3aed"
                />

            </div>

            <AnalyticsCharts predictions={predictions} />

        </div>

    );

}

function Card({ title, value, color }) {

    return (

        <div
            style={{
                background: "white",
                borderRadius: "16px",
                padding: "25px",
                borderTop: `6px solid ${color}`,
                boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
            }}
        >

            <h3
                style={{
                    color: "#6b7280"
                }}
            >
                {title}
            </h3>

            <h1
                style={{
                    marginTop: "10px",
                    color
                }}
            >
                {value}
            </h1>

        </div>

    );

}

export default Analytics;