import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";


export default function ProtectedRoute({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function checkUser() {

            const {
                data: { session }
            } = await supabase.auth.getSession();


            if (session) {
                setUser(session.user);
            }

            setLoading(false);

        }


        checkUser();


    }, []);



    if (loading) {

        return <h3>Loading...</h3>;

    }


    if (!user) {

        return <Navigate to="/login" replace />;

    }


    return children;

}