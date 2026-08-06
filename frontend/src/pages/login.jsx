import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    async function login() {

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });


        if (error) {

            alert(error.message);

        } else {

            alert("Login Successful");

            // الانتقال إلى Dashboard
            navigate("/");

        }
    }


    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#eef2f7"
            }}
        >

            <div
                style={{
                    width: 380,
                    background: "#fff",
                    padding: 35,
                    borderRadius: 15,
                    boxShadow: "0 8px 20px rgba(0,0,0,.1)"
                }}
            >

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 15
                    }}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 20
                    }}
                />


                <button
                    onClick={login}
                    style={{
                        width: "100%",
                        padding: 14,
                        background: "#2563EB",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </div>

        </div>

    );

}