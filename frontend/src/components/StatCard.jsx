function StatCard({ title, value, color }) {

    function getSubtitle() {

        if (title.includes("Healthy"))
            return "Machines operating normally";

        if (title.includes("Failure"))
            return "Requires immediate attention";

        if (title.includes("Confidence"))
            return "Model prediction reliability";

        return "Real-time monitoring";

    }

    return (

        <div
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#FFFFFF",
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 18px rgba(15,23,42,.08)",
                minHeight: "190px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all .25s ease"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                    "0 10px 24px rgba(15,23,42,.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(15,23,42,.08)";
            }}
        >

            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "4px",
                    background: color
                }}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <div
                    style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: color
                    }}
                />

                <div
                    style={{
                        color: "#16A34A",
                        fontSize: "12px",
                        fontWeight: 700
                    }}
                >
                    LIVE
                </div>

            </div>

            <div>

                <div
                    style={{
                        color: "#64748B",
                        fontSize: "14px",
                        fontWeight: 600,
                        marginTop: "18px"
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        marginTop: "10px",
                        fontSize: "42px",
                        fontWeight: 700,
                        color: "#0F172A",
                        letterSpacing: "-1px"
                    }}
                >
                    {value}
                </div>

            </div>

            <div>

                <div
                    style={{
                        color: "#64748B",
                        fontSize: "14px",
                        marginBottom: "12px"
                    }}
                >
                    {getSubtitle()}
                </div>

                <div
                    style={{
                        height: "6px",
                        width: "100%",
                        background: "#E2E8F0",
                        borderRadius: "999px",
                        overflow: "hidden"
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: color
                        }}
                    />
                </div>

            </div>

        </div>

    );

}

export default StatCard;
