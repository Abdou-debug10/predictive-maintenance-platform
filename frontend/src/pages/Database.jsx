import { useEffect, useMemo, useState } from "react";

const typeMap = { 1: "H", 2: "M", 3: "L", "1": "H", "2": "M", "3": "L" };

function ProgressBar({ value }) {
    const pct = Math.max(0, Math.min(100, Number(value) || 0));
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 120, height: 10, background: "#E5E7EB", borderRadius: 20 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#2563EB", borderRadius: 20 }} />
            </div>
            <strong>{pct.toFixed(2)}%</strong>
        </div>
    );
}

export default function Database() {
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            setLoading(true);
            const res = await fetch("https://predictive-maintenance-platform.onrender.com/predictions");
            if (!res.ok) throw new Error("Failed to fetch data");
            setRecords(await res.json());
            setError("");
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }

    const filtered = useMemo(() => records.filter(r => {
        const q = search.toLowerCase();
        return String(r.machine_type).toLowerCase().includes(q) || String(r.prediction).toLowerCase().includes(q);
    }), [records, search]);

    const healthy = filtered.filter(r => r.prediction.includes("Healthy")).length;
    const failure = filtered.length - healthy;
    const avg = filtered.length ? filtered.reduce((a, b) => a + Number(b.confidence), 0) / filtered.length : 0;

    return (
        <div style={{ padding: 30, background: "#EEF2F7", minHeight: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><h1>🗄 Database Explorer</h1><p>Live PostgreSQL Machine Prediction Records</p></div>
                <button onClick={load} style={{ padding: "12px 18px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10 }}>Refresh</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, margin: "20px 0" }}>
                {[
                    ["Total Records", filtered.length, "#111827"],
                    ["Healthy", healthy, "#16A34A"],
                    ["Failures", failure, "#DC2626"],
                    ["Avg Confidence", avg.toFixed(2) + "%", "#2563EB"]
                ].map(([t, v, c]) => (
                    <div key={t} style={{ background: "#fff", padding: 20, borderRadius: 16, boxShadow: "0 8px 20px rgba(0,0,0,.08)" }}>
                        <div>{t}</div><h2 style={{ color: c }}>{v}</h2>
                    </div>
                ))}
            </div>

            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ccc", marginBottom: 20 }} />

            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {!loading && !error &&
                <div style={{ overflow: "auto", background: "#fff", borderRadius: 16 }}>
                    <table style={{ width: "100%", minWidth: 1200, borderCollapse: "collapse" }}>
                        <thead style={{ background: "#2563EB", color: "#fff" }}>
                            <tr>{["ID", "Type", "Air", "Process", "RPM", "Torque", "Tool Wear", "Prediction", "Confidence", "Date"].map(h => <th key={h} style={{ padding: 14 }}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {filtered.map(r => {
                                const ok = r.prediction.includes("Healthy");
                                return (
                                    <tr key={r.id} style={{ background: ok ? "#F0FDF4" : "#FEF2F2" }}>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.id}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{typeMap[r.machine_type] || r.machine_type}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.air_temp}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.process_temp}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.rotational_speed}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.torque}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{r.tool_wear}</td>
                                        <td style={{ padding: 12, textAlign: "center" }}><span style={{ padding: "6px 12px", borderRadius: 20, fontWeight: 700, background: ok ? "#DCFCE7" : "#FEE2E2", color: ok ? "#166534" : "#991B1B" }}>{ok ? "Healthy" : "Failure"}</span></td>
                                        <td style={{ padding: 12 }}><ProgressBar value={r.confidence} /></td>
                                        <td style={{ padding: 12, textAlign: "center" }}>{new Date(r.created_at).toLocaleString()}</td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>}
        </div>);
}
