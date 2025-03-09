import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login, logout } from "./AuthService";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            setIsLoggedIn(true);
            // alert("Logged in successfully!");
            navigate("/admin"); // Redirect to Admin Panel
        } catch (error) {
            alert((error as Error).message);
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            {/* Navbar */}
            <nav style={{
                backgroundColor: "#007BFF",
                padding: "15px 20px",
                textAlign: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                width: "100%",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            }}>
                Admin Panel
            </nav>

            {/* Login Form Container */}
            <div style={{
                width: "300px",
                marginTop: "80px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                textAlign: "center"
            }}>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "#007BFF",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Login
                    </button>
                </form>

                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: "15px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "#dc3545",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;
