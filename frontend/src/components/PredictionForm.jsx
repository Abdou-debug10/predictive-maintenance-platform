import { useState } from "react";
import { API } from "../utils/api";

export default function PredictionForm({ onPrediction }) {

    const [form, setForm] = useState({
        Type: 2,
        air_temp: 300,
        process_temp: 310,
        rotational_speed: 1500,
        torque: 50,
        tool_wear: 120,
    });

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const inputStyle = {
        width: "100%",
        padding: "15px",
        borderRadius: "14px",
        border: "1px solid #D1D5DB",
        background: "#F8FAFC",
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box"
    };

    const labelStyle = {
        display: "block",
        marginBottom: 8,
        fontWeight: 600,
        color: "#374151",
        fontSize: 15
    };

    const cardStyle = {
        background: "#ffffff",
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        padding: 24,
        boxShadow: "0 6px 20px rgba(15,23,42,.05)"
    };

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: Number(value)
        });

    }

    function resetForm() {

        setForm({

            Type: 2,

            air_temp: 300,

            process_temp: 310,

            rotational_speed: 1500,

            torque: 50,

            tool_wear: 120

        });

        setResult(null);

    }

    async function predictMachine() {

        setLoading(true);

        try {

            const predictionRes = await API.post("/predict", form);

            const explainRes = await API.post("/explain", form);

            setResult({

                ...predictionRes.data,

                explanation: explainRes.data

            });

            if (onPrediction) {

                onPrediction();

            }

        }

        catch {

            setResult({

                prediction: "Prediction Failed",

                confidence: 0,

                error: true

            });

        }

        setLoading(false);

    }


    return (

        <div
            style={{
                marginTop: 35,
                background: "#ffffff",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 12px 35px rgba(15,23,42,.08)"
            }}
        >

            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: 35
                }}
            >

                <div>

                    <div
                        style={{
                            color: "#2563EB",
                            fontWeight: 700,
                            fontSize: 14,
                            letterSpacing: 1
                        }}
                    >
                        AI PREDICTION CONSOLE
                    </div>

                    <h2
                        style={{
                            margin: "8px 0",
                            fontSize: 34,
                            color: "#111827"
                        }}
                    >
                        Machine Prediction
                    </h2>

                    <p
                        style={{
                            color: "#6B7280",
                            fontSize: 16,
                            margin: 0
                        }}
                    >
                        Enter machine sensor values to evaluate equipment health using the trained prediction model.
                    </p>

                </div>

                <div
                    style={{
                        background: "linear-gradient(90deg,#2563EB,#4F46E5)",
                        color: "#fff",
                        padding: "14px 26px",
                        borderRadius: 40,
                        fontWeight: 700,
                        fontSize: 16
                    }}
                >
                    Prediction Engine
                </div>

            </div>

            {/* Input Cards */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                    gap: 28
                }}
            >

                <div style={cardStyle}>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: 24,
                            fontSize: 22
                        }}
                    >
                        Machine
                    </h3>

                    <label style={labelStyle}>
                        Machine Type
                    </label>

                    <select
                        name="Type"
                        value={form.Type}
                        onChange={handleChange}
                        style={inputStyle}
                    >

                        <option value={0}>Low (L)</option>

                        <option value={1}>Medium (M)</option>

                        <option value={2}>High (H)</option>

                    </select>

                    <div style={{ marginTop: 22 }}>

                        <label style={labelStyle}>
                            Rotational Speed (RPM)
                        </label>

                        <input
                            type="number"
                            name="rotational_speed"
                            value={form.rotational_speed}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                    </div>

                </div>

                <div style={cardStyle}>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: 24,
                            fontSize: 22
                        }}
                    >
                        Environment
                    </h3>

                    <label style={labelStyle}>
                        Air Temperature (K)
                    </label>

                    <input
                        type="number"
                        name="air_temp"
                        value={form.air_temp}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <div style={{ marginTop: 22 }}>

                        <label style={labelStyle}>
                            Process Temperature (K)
                        </label>

                        <input
                            type="number"
                            name="process_temp"
                            value={form.process_temp}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                    </div>

                </div>

                <div style={cardStyle}>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: 24,
                            fontSize: 22
                        }}
                    >
                        Performance
                    </h3>

                    <label style={labelStyle}>
                        Torque (Nm)
                    </label>

                    <input
                        type="number"
                        name="torque"
                        value={form.torque}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <div style={{ marginTop: 22 }}>

                        <label style={labelStyle}>
                            Tool Wear (minutes)
                        </label>

                        <input
                            type="number"
                            name="tool_wear"
                            value={form.tool_wear}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                    </div>

                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 32
                }}
            >

                <button
                    onClick={predictMachine}
                    disabled={loading}
                    style={{
                        flex: 1,
                        padding: "18px",
                        border: "none",
                        borderRadius: 14,
                        background: "#2563EB",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: 16
                    }}
                >
                    {loading ? "Running Prediction..." : "Run Prediction"}
                </button>

                <button
                    onClick={resetForm}
                    style={{
                        padding: "18px 34px",
                        border: "none",
                        borderRadius: 14,
                        background: "#DC2626",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer"
                    }}
                >
                    Reset
                </button>

            </div>
            {result && (

                <div
                    style={{
                        marginTop: 40,
                        borderRadius: 22,
                        background: "#F8FAFC",
                        border: "1px solid #E5E7EB",
                        padding: 30
                    }}
                >

                    {/* Prediction */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 20
                        }}
                    >

                        <div>

                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#64748B",
                                    fontWeight: 700,
                                    letterSpacing: 1
                                }}
                            >
                                AI PREDICTION RESULT
                            </div>

                            <h2
                                style={{
                                    marginTop: 8,
                                    marginBottom: 8,
                                    color:
                                        result.prediction === "Machine Healthy"
                                            ? "#16A34A"
                                            : "#DC2626",
                                    fontSize: 34
                                }}
                            >
                                {result.prediction}
                            </h2>

                            <div
                                style={{
                                    fontSize: 16,
                                    color: "#475569"
                                }}
                            >
                                Confidence Score
                            </div>

                        </div>

                        <div
                            style={{
                                fontSize: 46,
                                fontWeight: 800,
                                color: "#2563EB"
                            }}
                        >
                            {result.confidence}%
                        </div>

                    </div>

                    {/* Confidence Bar */}

                    <div
                        style={{
                            marginTop: 25,
                            height: 16,
                            background: "#E5E7EB",
                            borderRadius: 20,
                            overflow: "hidden"
                        }}
                    >

                        <div
                            style={{
                                width: `${result.confidence}%`,
                                height: "100%",
                                background:
                                    result.prediction === "Machine Healthy"
                                        ? "#16A34A"
                                        : "#DC2626"
                            }}
                        />

                    </div>

                    {/* AI Summary */}

                    {result.explanation && (

                        <div
                            style={{
                                marginTop: 30,
                                background: "#EFF6FF",
                                borderRadius: 18,
                                padding: 24
                            }}
                        >

                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: 12
                                }}
                            >
                                AI Explanation
                            </h3>

                            <p
                                style={{
                                    margin: 0,
                                    lineHeight: 1.8,
                                    color: "#334155"
                                }}
                            >
                                {result.explanation.summary}
                            </p>

                        </div>

                    )}

                    {/* SHAP */}

                    {result.explanation &&
                        result.explanation.feature_importance && (

                            <div style={{ marginTop: 35 }}>

                                <h3
                                    style={{
                                        marginBottom: 22
                                    }}
                                >
                                    SHAP Feature Importance
                                </h3>

                                {result.explanation.feature_importance.map((item) => (

                                    <div
                                        key={item.feature}
                                        style={{
                                            marginBottom: 24
                                        }}
                                    >

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: 8,
                                                fontWeight: 600
                                            }}
                                        >

                                            <span>{item.feature}</span>

                                            <span>{item.importance}%</span>

                                        </div>

                                        <div
                                            style={{
                                                height: 12,
                                                background: "#E5E7EB",
                                                borderRadius: 20,
                                                overflow: "hidden"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    width: `${item.importance}%`,
                                                    height: "100%",
                                                    background:
                                                        item.direction ===
                                                            "Increases Failure Risk"
                                                            ? "#DC2626"
                                                            : "#16A34A"
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                marginTop: 6,
                                                color: "#64748B",
                                                fontSize: 14
                                            }}
                                        >
                                            {item.direction}
                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    {/* Recommendation */}

                    <div
                        style={{
                            marginTop: 30,
                            padding: 24,
                            borderRadius: 18,
                            background:
                                result.prediction === "Machine Healthy"
                                    ? "#ECFDF5"
                                    : "#FEF2F2"
                        }}
                    >

                        <h3
                            style={{
                                marginTop: 0
                            }}
                        >
                            Maintenance Recommendation
                        </h3>

                        <p
                            style={{
                                marginBottom: 0,
                                lineHeight: 1.8
                            }}
                        >
                            {result.prediction === "Machine Healthy"

                                ? "Machine is operating within expected conditions. Continue routine inspection, monitor sensor readings, and perform preventive maintenance according to schedule."

                                : "Machine shows a high probability of failure. Inspect bearings, cutting tool, lubrication system, and torque conditions immediately to reduce the risk of unplanned downtime."}

                        </p>

                    </div>

                </div>

            )}

        </div>

    );

}


