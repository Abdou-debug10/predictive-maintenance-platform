import {
    FaRobot,
    FaChartBar,
    FaDatabase,
    FaHome,
    FaHistory
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Navbar() {

    return (

        <aside
            style={{
                width: "270px",
                minHeight: "100vh",
                background: "#0F172A",
                borderRight: "1px solid #1E293B",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "30px 22px",
                position: "sticky",
                top: 0
            }}
        >

            <div>

                <div
                    style={{
                        marginBottom: "45px"
                    }}
                >

                    <h2
                        style={{
                            color: "#F8FAFC",
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 700
                        }}
                    >
                        Predictive
                    </h2>

                    <h2
                        style={{
                            color: "#3B82F6",
                            marginTop: "2px",
                            fontSize: "24px",
                            fontWeight: 700
                        }}
                    >
                        Maintenance AI
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8",
                            marginTop: "10px",
                            fontSize: "13px",
                            lineHeight: "20px"
                        }}
                    >
                        Industrial Asset Intelligence Platform
                    </p>

                </div>

                <MenuItem
                    to="/"
                    icon={<FaHome size={18} />}
                    text="Dashboard"
                />

                <MenuItem
                    to="/analytics"
                    icon={<FaChartBar size={18} />}
                    text="Analytics"
                />

                <MenuItem
                    to="/history"
                    icon={<FaHistory size={18} />}
                    text="Prediction History"
                />

                <MenuItem
                    to="/database"
                    icon={<FaDatabase size={18} />}
                    text="Database"
                />

                <MenuItem
                    to="/copilot"
                    icon={<FaRobot size={18} />}
                    text="AI Copilot"
                />

            </div>

            <div
                style={{
                    borderTop: "1px solid #1E293B",
                    paddingTop: "18px"
                }}
            >

                <div
                    style={{
                        color: "#94A3B8",
                        fontSize: "13px"
                    }}
                >
                    Version 1.0
                </div>

            </div>

        </aside>

    );

}

function MenuItem({ to, icon, text }) {

    return (

        <NavLink
            to={to}
            style={({ isActive }) => ({

                display: "flex",

                alignItems: "center",

                gap: "15px",

                padding: "14px 18px",

                marginBottom: "10px",

                borderRadius: "12px",

                textDecoration: "none",

                fontSize: "15px",

                fontWeight: 600,

                color: isActive ? "#FFFFFF" : "#CBD5E1",

                background: isActive ? "#2563EB" : "transparent",

                transition: "all 0.2s ease"

            })}
        >

            {icon}

            <span>{text}</span>

        </NavLink>

    );

}

export default Navbar;