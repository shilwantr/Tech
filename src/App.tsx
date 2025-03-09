import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminPanel from "./AdminPanel"; // Import Admin Panel

const App = () => {
    return (
        <Router>
            <div>
                {/* Navigation Bar */}
                <nav style={{
                    display: "flex",
                    gap: "20px",
                    padding: "15px",
                    background: "#007BFF",
                    color: "white",
                    justifyContent: "center"
                }}>
                    <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>Home</Link>
                    <Link to="/login" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>Admin Login</Link>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
