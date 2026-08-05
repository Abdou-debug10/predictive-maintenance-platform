import { useState } from "react";

function AICopilot({ predictions }) {

    const [response, setResponse] = useState("");

    function askAI() {

        if (predictions.length === 0) {

            setResponse("No prediction data available.");

            return;

        }

        const latest = predictions[0];

        if (latest.prediction === "Machine Healthy") {

            setResponse(
                `Analysis Complete

Machine Status
Healthy

Confidence
${latest.confidence}%

Summary
The machine is operating within normal conditions.

Recommendation
• Continue preventive maintenance.
• Monitor torque and tool wear.
• No immediate intervention required.
• Schedule the next inspection as planned.`
            );

        }

        else {

            setResponse(
                `Analysis Complete

Machine Status
Failure Predicted

Confidence
${latest.confidence}%

Summary
The model predicts a high probability of machine failure.

Recommended Actions

• Inspect tool wear immediately.
• Check torque abnormalities.
• Verify bearing and lubrication condition.
• Schedule maintenance before continued operation.
• Monitor sensor values after maintenance.`
            );

        }

    }

    return (

        <div
            style={{
                marginTop: 35,
                background: "#FFFFFF",
                borderRadius: 24,
                border: "1px solid #E5E7EB",
                boxShadow: "0 12px 30px rgba(15,23,42,.08)",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    padding: "24px 30px"
                }}
            >

                <div
                    style={{
                        fontSize: 14,
                        letterSpacing: 1,
                        color: "#93C5FD",
                        fontWeight: 700
                    }}
                >
                    AI ASSISTANT
                </div>

                <h2
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: 30
                    }}
                >
                    AI Maintenance Copilot
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: "#CBD5E1",
                        lineHeight: 1.7
                    }}
                >
                    Generate an AI-based maintenance recommendation using the
                    most recent machine prediction.
                </p>

            </div>

            <div
                style={{
                    padding: 30
                }}
            >

                <button
                    onClick={askAI}
                    style={{
                        background: "#2563EB",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "16px 28px",
                        borderRadius: 12,
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: 15
                    }}
                >
                    Analyze Latest Prediction
                </button>

                <div
                    style={{
                        marginTop: 30,
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: 18,
                        padding: 25,
                        minHeight: 260
                    }}
                >

                    <div
                        style={{
                            fontWeight: 700,
                            color: "#111827",
                            marginBottom: 18,
                            fontSize: 18
                        }}
                    >
                        Copilot Response
                    </div>

                    <div
                        style={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.9,
                            color: "#334155",
                            fontSize: 15
                        }}
                    >
                        {

                            response ||

                            `Click "Analyze Latest Prediction" to generate an AI maintenance recommendation based on the latest prediction stored in the system.`

                        }
                    </div>

                </div>

            </div>

        </div>

    );

}

export default AICopilot;