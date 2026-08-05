import { useState, useEffect, useRef } from "react";

function StatusBadge({ icon, title, value, color }) {
    return (
        <div
            style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "14px 18px",
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "190px",
                boxShadow: "0 8px 18px rgba(0,0,0,.05)"
            }}
        >
            <div
                style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px"
                }}
            >
                {icon}
            </div>

            <div>
                <div
                    style={{
                        fontSize: "13px",
                        color: "#64748b"
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontWeight: "700",
                        fontSize: "15px"
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value, color }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #edf2f7"
            }}
        >
            <span
                style={{
                    color: "#64748b"
                }}
            >
                {label}
            </span>

            <strong
                style={{
                    color: color || "#111827"
                }}
            >
                {value}
            </strong>
        </div>
    );
}

export default function AICopilotPage() {

    const [messages, setMessages] = useState([
        {
            sender: "AI",
            text:
                `Welcome to the AI Maintenance Copilot.

Ask questions about machine health, prediction explanations, maintenance recommendations, or sensor diagnostics.

The assistant uses your deployed FastAPI backend together with the local Ollama LLM to generate responses.`
        }
    ]);

    const [typing, setTyping] = useState(false);

    const [input, setInput] = useState("");

    const endRef = useRef(null);

    useEffect(() => {

        endRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, typing]);

    const suggestions = [

        "Explain Prediction",

        "Root Cause Analysis",

        "Maintenance Plan",

        "Failure Risk",

        "Sensor Summary"

    ];

    async function send(text = input) {

        if (!text.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                sender: "You",
                text
            }
        ]);

        setInput("");

        setTyping(true);

        try {

            const response = await fetch(
                "https://predictive-maintenance-platform.onrender.com/copilot",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: text
                    })
                }
            );

            const data = await response.json();

            setMessages(prev => [
                ...prev,
                {
                    sender: "AI",
                    text:
                        data.answer ||
                        "No response received from AI."
                }
            ]);

        }
        catch {

            setMessages(prev => [
                ...prev,
                {
                    sender: "AI",
                    text:
                        " Unable to connect to FastAPI backend."
                }
            ]);

        }

        setTyping(false);

    }

    return (

        <div
            style={{
                padding: "35px",
                background: "#eef2f7",
                minHeight: "100vh"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                    color: "white",
                    padding: "35px",
                    borderRadius: "24px",
                    marginBottom: "30px",
                    boxShadow:
                        "0 18px 40px rgba(37,99,235,.25)"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        fontSize: "42px"
                    }}
                >
                    AI Maintenance Copilot
                </h1>

                <p
                    style={{
                        marginTop: "12px",
                        opacity: 0.95,
                        fontSize: "18px"
                    }}
                >
                    Industrial AI assistant for predictive maintenance powered by FastAPI, Ollama, PostgreSQL, and the deployed machine learning model.
                </p>

            </div>

            {/* STATUS */}

            <div
                style={{
                    display: "flex",
                    gap: "18px",
                    flexWrap: "wrap",
                    marginBottom: "30px"
                }}
            >

                <StatusBadge
                    icon=""
                    title="FastAPI"
                    value="Connected"
                    color="#16a34a"
                />

                <StatusBadge
                    icon=""
                    title="Ollama"
                    value="Running"
                    color="#2563eb"
                />

                <StatusBadge
                    icon=""
                    title="Database"
                    value="Connected"
                    color="#7c3aed"
                />

                <StatusBadge
                    icon=""
                    title="AI Engine"
                    value="Ready"
                    color="#f59e0b"
                />

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "24px"
                }}
            >

                {/* LEFT PANEL */}

                <div>
                    ...
                </div>

                {/* RIGHT PANEL */}

                <div>
                    ...
                </div>

            </div>

            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "22px",
                    overflow: "hidden",
                    boxShadow: "0 12px 30px rgba(0,0,0,.08)",
                    display: "flex",
                    flexDirection: "column",
                    height: "760px"
                }}
            >

                {/* Chat Header */}

                <div
                    style={{
                        padding: "24px",
                        borderBottom: "1px solid #edf2f7"
                    }}
                >

                    <h2
                        style={{
                            margin: 0
                        }}
                    >
                        Conversation
                    </h2>

                    <p
                        style={{
                            color: "#64748b",
                            marginTop: "8px"
                        }}
                    >
                        Ask natural-language questions about machine failures, sensor readings, maintenance planning, and prediction explanations.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "18px"
                        }}
                    >

                        {suggestions.map((item) => (

                            <button
                                key={item}
                                onClick={() => send(item)}
                                style={{
                                    border: "1px solid #dbe3ef",
                                    background: "#ffffff",
                                    padding: "10px 18px",
                                    borderRadius: "30px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: ".3s"
                                }}
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                </div>

                {/* Conversation */}

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "24px",
                        background: "#f8fafc"
                    }}
                >

                    {messages.map((m, i) => (

                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent:
                                    m.sender === "You"
                                        ? "flex-end"
                                        : "flex-start",
                                marginBottom: "22px"
                            }}
                        >

                            <div
                                style={{
                                    maxWidth: "78%",
                                    padding: "18px",
                                    borderRadius: "18px",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.8,
                                    fontSize: "15px",
                                    background:
                                        m.sender === "AI"
                                            ? "#ffffff"
                                            : "#2563eb",
                                    color:
                                        m.sender === "AI"
                                            ? "#111827"
                                            : "#ffffff",
                                    boxShadow:
                                        "0 8px 20px rgba(0,0,0,.08)"
                                }}
                            >

                                <strong>
                                    {m.sender === "AI"
                                        ? " AI Copilot"
                                        : " You"}
                                </strong>

                                <br />
                                <br />

                                {m.text}

                            </div>

                        </div>

                    ))}

                    {typing && (

                        <div
                            style={{
                                color: "#64748b",
                                fontWeight: "600",
                                padding: "10px"
                            }}
                        >
                            AI is thinking...
                        </div>

                    )}

                    <div ref={endRef} />

                </div>

                {/* Bottom Input */}

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        padding: "20px",
                        borderTop: "1px solid #edf2f7"
                    }}
                >

                    <input
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                send();

                            }

                        }}
                        placeholder="Ask anything about machine health..."
                        style={{
                            flex: 1,
                            padding: "15px",
                            borderRadius: "14px",
                            border: "1px solid #d1d5db",
                            outline: "none",
                            fontSize: "15px"
                        }}
                    />

                    <button
                        onClick={() => send()}
                        style={{
                            border: "none",
                            background:
                                "linear-gradient(90deg,#2563eb,#1d4ed8)",
                            color: "white",
                            padding: "0 28px",
                            borderRadius: "14px",
                            cursor: "pointer",
                            fontWeight: "700"
                        }}
                    >
                        Send
                    </button>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "22px"
                }}
            >

                {/* Machine Context */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        boxShadow: "0 12px 30px rgba(0,0,0,.08)"
                    }}
                >

                    <h2 style={{ marginTop: 0 }}>
                        Machine Context
                    </h2>

                    <InfoRow
                        label="Machine ID"
                        value="MCH-1008"
                    />

                    <InfoRow
                        label="Health Status"
                        value="Healthy"
                        color="#16a34a"
                    />

                    <InfoRow
                        label="Confidence"
                        value="99.78%"
                    />

                    <InfoRow
                        label="Risk Level"
                        value="Low"
                        color="#2563eb"
                    />

                    <InfoRow
                        label="Last Prediction"
                        value="2 minutes ago"
                    />

                </div>

                {/* AI Recommendation */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        boxShadow: "0 12px 30px rgba(0,0,0,.08)"
                    }}
                >

                    <h2 style={{ marginTop: 0 }}>
                        AI Recommendation
                    </h2>

                    <div
                        style={{
                            background: "#ecfdf5",
                            color: "#15803d",
                            padding: "14px",
                            borderRadius: "14px",
                            fontWeight: "700",
                            marginBottom: "18px"
                        }}
                    >
                        Machine Operating Normally
                    </div>

                    <InfoRow
                        label="Action"
                        value="Continue Production"
                    />

                    <InfoRow
                        label="Next Maintenance"
                        value="Within 48 Hours"
                    />

                    <InfoRow
                        label="Priority"
                        value="Low"
                        color="#16a34a"
                    />

                    <InfoRow
                        label="Estimated Downtime"
                        value="0 Hours"
                    />

                </div>

                {/* AI Engine */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        boxShadow: "0 12px 30px rgba(0,0,0,.08)"
                    }}
                >

                    <h2 style={{ marginTop: 0 }}>
                        AI Engine Status
                    </h2>

                    <InfoRow
                        label="Model"
                        value="Qwen2.5 : 1.5B"
                    />

                    <InfoRow
                        label="FastAPI"
                        value="Connected"
                        color="#16a34a"
                    />

                    <InfoRow
                        label="Ollama"
                        value="Running"
                        color="#16a34a"
                    />

                    <InfoRow
                        label="PostgreSQL"
                        value="Connected"
                        color="#16a34a"
                    />

                    <InfoRow
                        label="Latency"
                        value="< 2 Seconds"
                    />

                </div>

                {/* AI Features */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "20px",
                        padding: "24px",
                        boxShadow: "0 12px 30px rgba(0,0,0,.08)"
                    }}
                >

                    <h2 style={{ marginTop: 0 }}>
                        AI Capabilities
                    </h2>

                    <ul
                        style={{
                            paddingLeft: "22px",
                            lineHeight: "2",
                            color: "#374151"
                        }}
                    >

                        <li>Explain ML Predictions</li>

                        <li>Root Cause Analysis</li>

                        <li>Maintenance Planning</li>

                        <li>Sensor Diagnostics</li>

                        <li>Failure Risk Assessment</li>

                        <li>Machine Health Summary</li>

                        <li>Predictive Maintenance Support</li>

                    </ul>

                </div>

            </div>

        </div>



    );

}
