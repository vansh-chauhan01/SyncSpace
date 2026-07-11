import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const client = axios.create({
    baseURL: `${server}/api/users`,
    withCredentials: true,
});

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    await client.get("/isLoggedIn");
                    setLoading(false);
                } catch (err) {
                    alert("you need to log in first");
                    navigate("/auth");
                }
            };

            checkAuth();
        }, [navigate]);

        if (loading) {
            return <h2>Loading...</h2>;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;