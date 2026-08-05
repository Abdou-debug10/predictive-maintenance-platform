import { useMemo, useState } from "react";

export default function PredictionTable({ predictions }) {

    const [search, setSearch] = useState("");

    const [sortDesc, setSortDesc] = useState(true);

    const [statusFilter, setStatusFilter] = useState("All");

    const filteredData = useMemo(() => {

        let data = [...predictions];

        // Search
        if (search.trim() !== "") {

            data = data.filter(item =>
                item.prediction
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        // Status Filter
        if (statusFilter !== "All") {

            data = data.filter(item =>
                item.prediction === statusFilter
            );

        }

        // Sorting
        data.sort((a, b) =>
            sortDesc
                ? b.id - a.id
                : a.id - b.id
        );

        return data;

    }, [
        predictions,
        search,
        sortDesc,
        statusFilter
    ]);

    const healthy =
        filteredData.filter(
            p => p.prediction === "Machine Healthy"
        ).length;

    const failure =
        filteredData.filter(
            p => p.prediction === "Machine Failure Predicted"
        ).length;

    const averageConfidence =
        filteredData.length > 0
            ? (
                filteredData.reduce(
                    (sum, p) =>
                        sum + Number(p.confidence),
                    0
                ) / filteredData.length
            ).toFixed(2)
            : "0.00";

    function badge(status) {

        const healthy =
            status === "Machine Healthy";

        return {

            bg: healthy
                ? "#DCFCE7"
                : "#FEE2E2",

            color: healthy
                ? "#15803D"
                : "#B91C1C",

            text: healthy
                ? "Healthy"
                : "Failure"

        };

    }

    return (

        <div
            style={{
                marginTop: 40,
                background: "#FFFFFF",
                borderRadius: 24,
                padding: 30,
                boxShadow: "0 15px 35px rgba(15,23,42,.08)"
            }}
        >

            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 20,
                    marginBottom: 30
                }}
            >

                <div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: 30,
                            color: "#111827",
                            fontWeight: 700
                        }}
                    >
                        Prediction History
                    </h2>

                    <p
                        style={{
                            marginTop: 8,
                            color: "#6B7280",
                            fontSize: 15
                        }}
                    >
                        Historical machine predictions stored in PostgreSQL.
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        flexWrap: "wrap"
                    }}
                >

                    <input
                        placeholder="Search prediction..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={input}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        style={input}
                    >
                        <option value="All">
                            All
                        </option>

                        <option value="Machine Healthy">
                            Healthy
                        </option>

                        <option value="Machine Failure Predicted">
                            Failure
                        </option>

                    </select>

                    <button
                        onClick={() =>
                            setSortDesc(!sortDesc)
                        }
                        style={btn}
                    >
                        {sortDesc
                            ? "Newest First"
                            : "Oldest First"}
                    </button>

                </div>

            </div>

            {/* Summary Cards */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                    marginBottom: 30
                }}
            >

                <Stat
                    title="Records"
                    value={filteredData.length}
                    color="#2563EB"
                />

                <Stat
                    title="Healthy"
                    value={healthy}
                    color="#16A34A"
                />

                <Stat
                    title="Failures"
                    value={failure}
                    color="#DC2626"
                />

                <Stat
                    title="Average Confidence"
                    value={`${averageConfidence}%`}
                    color="#7C3AED"
                />

            </div>

            {/* Prediction Table */}

            <div
                style={{
                    overflowX: "auto",
                    borderRadius: 18,
                    border: "1px solid #E5E7EB"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        minWidth: 1000,
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#1E3A8A",
                                color: "#FFFFFF"
                            }}
                        >

                            <TH>ID</TH>

                            <TH>Prediction</TH>

                            <TH>Confidence</TH>

                            <TH>Status</TH>

                            <TH>Timestamp</TH>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredData.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    style={{
                                        padding: 60,
                                        textAlign: "center",
                                        color: "#6B7280",
                                        fontSize: 18
                                    }}
                                >
                                    No prediction records found.
                                </td>

                            </tr>

                        ) : (

                            filteredData.map((item) => {

                                const b = badge(item.prediction);

                                return (

                                    <tr
                                        key={item.id}
                                        style={{
                                            borderBottom: "1px solid #E5E7EB",
                                            transition: ".25s"
                                        }}
                                    >

                                        <TD>

                                            <strong>
                                                #{item.id}
                                            </strong>

                                        </TD>

                                        <TD>

                                            <div
                                                style={{
                                                    fontWeight: 700,
                                                    color: "#111827"
                                                }}
                                            >
                                                {item.prediction}
                                            </div>

                                        </TD>

                                        <TD>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        flex: 1,
                                                        height: 10,
                                                        background: "#E5E7EB",
                                                        borderRadius: 30,
                                                        overflow: "hidden"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: `${item.confidence}%`,
                                                            height: "100%",
                                                            background:
                                                                item.confidence >= 95
                                                                    ? "#16A34A"
                                                                    : item.confidence >= 80
                                                                        ? "#2563EB"
                                                                        : "#F59E0B"
                                                        }}
                                                    />

                                                </div>

                                                <strong>
                                                    {Number(item.confidence).toFixed(2)}%
                                                </strong>

                                            </div>

                                        </TD>

                                        <TD>

                                            <span
                                                style={{
                                                    background: b.bg,
                                                    color: b.color,
                                                    padding: "8px 18px",
                                                    borderRadius: 30,
                                                    fontWeight: 700,
                                                    fontSize: 14
                                                }}
                                            >
                                                {b.text}
                                            </span>

                                        </TD>

                                        <TD>

                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}

                                        </TD>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>
        </div>

    );

}

function Stat({ title, value, color }) {

    return (

        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderTop: `5px solid ${color}`,
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 4px 12px rgba(15,23,42,.06)"
            }}
        >

            <div
                style={{
                    color: "#64748B",
                    fontSize: 14,
                    fontWeight: 600
                }}
            >
                {title}
            </div>

            <div
                style={{
                    marginTop: 10,
                    fontSize: 34,
                    fontWeight: 700,
                    color
                }}
            >
                {value}
            </div>

        </div>

    );

}

function TH({ children }) {

    return (

        <th
            style={{
                padding: 18,
                textAlign: "left",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: ".3px"
            }}
        >
            {children}
        </th>

    );

}

function TD({ children }) {

    return (

        <td
            style={{
                padding: 18,
                fontSize: 15,
                color: "#374151"
            }}
        >
            {children}
        </td>

    );

}

const input = {

    padding: "12px 16px",

    border: "1px solid #D1D5DB",

    borderRadius: 12,

    background: "#FFFFFF",

    fontSize: 15,

    minWidth: 220,

    outline: "none"

};

const btn = {

    background: "#2563EB",

    color: "#FFFFFF",

    border: "none",

    padding: "12px 20px",

    borderRadius: 12,

    cursor: "pointer",

    fontWeight: 600,

    fontSize: 14,

    transition: ".25s"

};


