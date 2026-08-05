import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import {
    Bar,
    Line,
    Doughnut
} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function AnalyticsCharts({ predictions }) {

    const labels =
        predictions
            .map(p => `Prediction ${p.id}`)
            .reverse();

    const confidence =
        predictions
            .map(p => Number(p.confidence))
            .reverse();

    const healthy =
        predictions.filter(
            p => p.prediction === "Machine Healthy"
        ).length;

    const failure =
        predictions.filter(
            p => p.prediction ===
                "Machine Failure Predicted"
        ).length;

    const machineType = {

        L:
            predictions.filter(
                p =>
                    String(p.machine_type) === "L" ||
                    String(p.machine_type) === "0"
            ).length,

        M:
            predictions.filter(
                p =>
                    String(p.machine_type) === "M" ||
                    String(p.machine_type) === "1"
            ).length,

        H:
            predictions.filter(
                p =>
                    String(p.machine_type) === "H" ||
                    String(p.machine_type) === "2"
            ).length

    };

    const chartCard = {

        background: "#FFFFFF",

        borderRadius: 18,

        padding: 28,

        border: "1px solid #E2E8F0",

        boxShadow:
            "0 4px 18px rgba(15,23,42,.08)",

        transition: "all .25s ease"

    };

    const titleStyle = {

        margin: 0,

        color: "#0F172A",

        fontSize: 22,

        fontWeight: 700

    };

    const subtitleStyle = {

        marginTop: 8,

        marginBottom: 20,

        color: "#64748B",

        fontSize: 14,

        lineHeight: "22px"

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "top",

                labels: {

                    color: "#334155",

                    font: {

                        size: 13,

                        weight: "600"

                    }

                }

            }

        },

        scales: {

            y: {

                grid: {

                    color: "#E2E8F0"

                }

            },

            x: {

                grid: {

                    display: false

                }

            }

        }

    };

    const barData = {

        labels,

        datasets: [

            {

                label: "Prediction Confidence (%)",

                data: confidence,

                backgroundColor: "#2563EB",

                borderRadius: 8,

                borderSkipped: false

            }

        ]

    };

    const lineData = {

        labels,

        datasets: [

            {

                label: "Confidence Trend",

                data: confidence,

                borderColor: "#2563EB",

                backgroundColor: "rgba(37,99,235,.12)",

                fill: true,

                tension: 0.35,

                pointRadius: 4,

                pointHoverRadius: 6

            }

        ]

    };

    const doughnutData = {

        labels: [

            "Healthy",

            "Failure"

        ],

        datasets: [

            {

                data: [

                    healthy,

                    failure

                ],

                backgroundColor: [

                    "#22C55E",

                    "#EF4444"

                ],

                borderColor: "#FFFFFF",

                borderWidth: 3

            }

        ]

    };

    const typeData = {

        labels: [

            "Low",

            "Medium",

            "High"

        ],

        datasets: [

            {

                label: "Machine Types",

                data: [

                    machineType.L,

                    machineType.M,

                    machineType.H

                ],

                backgroundColor: [

                    "#60A5FA",

                    "#34D399",

                    "#F59E0B"

                ],

                borderRadius: 8,

                borderSkipped: false

            }

        ]

    };

    const averageConfidence =

        confidence.length > 0

            ? (

                confidence.reduce(

                    (sum, value) => sum + value,

                    0

                ) / confidence.length

            ).toFixed(2)

            : 0;

    const insights = [

        `Total predictions processed: ${predictions.length}`,

        `Healthy machines detected: ${healthy}`,

        `Failure predictions detected: ${failure}`,

        `Average model confidence: ${averageConfidence}%`,

        "Machines with increasing torque and tool wear should be prioritized for inspection.",

        "Review prediction history regularly to minimize unexpected downtime."

    ];

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(460px,1fr))",
                gap: 24,
                marginTop: 30
            }}
        >

            <div style={chartCard}>

                <h2 style={titleStyle}>
                    Prediction Confidence
                </h2>

                <p style={subtitleStyle}>
                    Confidence score for every machine prediction generated by the AI model.
                </p>

                <div style={{ height: 340 }}>
                    <Bar
                        data={barData}
                        options={options}
                    />
                </div>

            </div>

            <div style={chartCard}>

                <h2 style={titleStyle}>
                    Machine Health Distribution
                </h2>

                <p style={subtitleStyle}>
                    Overall health status predicted across all monitored machines.
                </p>

                <div style={{ height: 380 }}>
                    <Doughnut
                        data={doughnutData}
                        options={options}
                    />
                </div>

            </div>

            <div style={chartCard}>

                <h2 style={titleStyle}>
                    Confidence Trend
                </h2>

                <p style={subtitleStyle}>
                    Historical confidence trend for recent predictions.
                </p>

                <div style={{ height: 340 }}>
                    <Line
                        data={lineData}
                        options={options}
                    />
                </div>

            </div>

            <div style={chartCard}>

                <h2 style={titleStyle}>
                    Machine Type Distribution
                </h2>


                <p style={subtitleStyle}>
                    Distribution of predictions by machine category.
                </p>

                <div style={{ height: 340 }}>
                    <Bar
                        data={typeData}
                        options={options}
                    />
                </div>
            </div>
            <div
                style={{
                    ...chartCard,
                    gridColumn: "1 / -1"
                }}
            >

                <h2 style={titleStyle}>
                    Operational Insights
                </h2>

                <p style={subtitleStyle}>
                    AI-generated operational summary based on the latest prediction history.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                        gap: "20px",
                        marginTop: "10px"
                    }}
                >

                    <div>

                        <div
                            style={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#0F172A",
                                marginBottom: "12px"
                            }}
                        >
                            Model Summary
                        </div>

                        <ul
                            style={{
                                color: "#475569",
                                lineHeight: "2",
                                paddingLeft: "18px",
                                margin: 0
                            }}
                        >
                            {insights.map((item, index) => (

                                <li key={index}>
                                    {item}
                                </li>

                            ))}
                        </ul>

                    </div>

                    <div
                        style={{
                            borderLeft: "1px solid #E2E8F0",
                            paddingLeft: "24px"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "#0F172A",
                                marginBottom: "18px"
                            }}
                        >
                            Current Statistics
                        </div>

                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}
                        >

                            <tbody>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#64748B"
                                        }}
                                    >
                                        Total Predictions
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            fontWeight: 700,
                                            color: "#0F172A"
                                        }}
                                    >
                                        {predictions.length}
                                    </td>

                                </tr>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#64748B"
                                        }}
                                    >
                                        Healthy Machines
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            color: "#16A34A",
                                            fontWeight: 700
                                        }}
                                    >
                                        {healthy}
                                    </td>

                                </tr>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#64748B"
                                        }}
                                    >
                                        Failure Predictions
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            color: "#DC2626",
                                            fontWeight: 700
                                        }}
                                    >
                                        {failure}
                                    </td>

                                </tr>

                                <tr>

                                    <td
                                        style={{
                                            padding: "12px 0",
                                            color: "#64748B"
                                        }}
                                    >
                                        Average Confidence
                                    </td>

                                    <td
                                        style={{
                                            textAlign: "right",
                                            color: "#2563EB",
                                            fontWeight: 700
                                        }}
                                    >
                                        {averageConfidence}%
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}


