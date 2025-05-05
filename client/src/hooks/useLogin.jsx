import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(values),
            });
            console.log(fetch("http://localhost:3000/api/auth/login").then((res)=>console.log(res)));
            const data = await res.json();
            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 404) {
                setError(data.message);
            } else {
                message.error("Registration failed");
            }
        } catch (err) {
            message.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
