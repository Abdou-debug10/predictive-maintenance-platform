function HealthIndicators({ predictions }) {

    const healthy = predictions.filter(
        p => p.prediction === "Machine Healthy"
    ).length;

    const failure = predictions.filter(
        p => p.prediction === "Machine Failure Predicted"
    ).length;

    const warning = Math.max(
        0,
        predictions.length - healthy - failure
    );

    const total = predictions.length || 1;

    const healthyPercent = (
        (healthy / total) * 100
    ).toFixed(1);

    const warningPercent = (
        (warning / total) * 100
    ).toFixed(1);

    const failurePercent = (
        (failure / total) * 100
    ).toFixed(1);

    const cards = [

        {
            title: "Healthy Machines",
            value: healthy,
            percent: healthyPercent,
            color: "#16A34A",
            description:
                "Machines operating within normal parameters."
        },

        {
            title: "Warning State",
            value: warning,
            percent: warningPercent,
            color: "#F59E0B",
            description:
                "Machines requiring observation."
        },

        {
            title: "Failure Risk",
            value: failure,
            percent: failurePercent,
            color: "#DC2626",
            description:
                "Machines predicted to require maintenance."
        }

    ];

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(320px,1fr))",
                gap: 24,
                marginTop: 32
            }}
        >

            {

                cards.map(card => (

                    <div

                        key={card.title}

                        style={{

                            background: "#FFFFFF",

                            borderRadius: 20,

                            borderTop: `6px solid ${card.color}`,

                            padding: 26,

                            boxShadow:
                                "0 8px 24px rgba(15,23,42,.08)",

                            border:
                                "1px solid #E2E8F0",

                            transition:
                                ".25s"

                        }}

                        onMouseEnter={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(-6px)";

                            e.currentTarget.style.boxShadow =
                                "0 18px 35px rgba(37,99,235,.12)";

                        }}

                        onMouseLeave={(e) => {

                            e.currentTarget.style.transform =
                                "translateY(0px)";

                            e.currentTarget.style.boxShadow =
                                "0 8px 24px rgba(15,23,42,.08)";

                        }}

                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                                marginBottom: 18
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        color: "#64748B",
                                        fontSize: 15,
                                        fontWeight: 600
                                    }}
                                >
                                    {card.title}
                                </div>

                                <div
                                    style={{
                                        fontSize: 44,
                                        fontWeight: 700,
                                        color: card.color,
                                        marginTop: 10
                                    }}
                                >
                                    {card.value}
                                </div>

                            </div>

                            <div
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                    background: card.color,
                                    opacity: .12
                                }}
                            />

                        </div>

                        <div
                            style={{
                                height: 12,
                                background: "#E5E7EB",
                                borderRadius: 999,
                                overflow: "hidden",
                                marginBottom: 14
                            }}
                        >

                            <div
                                style={{
                                    width: `${card.percent}%`,
                                    height: "100%",
                                    background: card.color
                                }}
                            />

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom: 12,
                                fontSize: 14
                            }}
                        >

                            <span
                                style={{
                                    color: "#64748B"
                                }}
                            >
                                Fleet Share
                            </span>

                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#111827"
                                }}
                            >
                                {card.percent}%
                            </span>

                        </div>

                        <div
                            style={{
                                color: "#64748B",
                                lineHeight: 1.7,
                                fontSize: 14
                            }}
                        >
                            {card.description}
                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default HealthIndicators;