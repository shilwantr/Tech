import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "./firebase"; // Import Firestore
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Article } from "./types";
import { logout } from "./AuthService"; // Import logout function

const AdminPanel = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [newArticle, setNewArticle] = useState<Article>({ id: "0", title: "", imageUrl: "", content: "" });
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const fetchedArticles: Article[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Article, "id">),
        }));
        setArticles(fetchedArticles);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };

    const handleAddArticle = async () => {
        if (!newArticle.title || !newArticle.imageUrl || !newArticle.content) {
            alert("All fields are required!");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "articles"), {
                title: newArticle.title,
                imageUrl: newArticle.imageUrl,
                content: newArticle.content,
            });

            console.log("Article added with ID:", docRef.id);
            setNewArticle({ id: "", title: "", imageUrl: "", content: "" });

            fetchArticles();
        } catch (error) {
            console.error("Error adding article:", error);
        }
    };

    const handleDeleteArticle = async (id: string) => {
        try {
            await deleteDoc(doc(db, "articles", id));
            fetchArticles();
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
            {/* Navbar with Logout Button */}
            <nav style={{
                backgroundColor: "#007BFF",
                padding: "15px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
            }}>
                <span>My Articles</span>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}>
                    Logout
                </button>
            </nav>

            {/* Form Container (900x600 Card) */}
            <div style={{
                width: "900px",
                height: "600px",
                margin: "50px auto",
                padding: "30px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
            }}>
                <h3>Add New Article</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newArticle.title}
                    onChange={handleChange}
                    style={{ width: "80%", padding: "10px", margin: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={newArticle.imageUrl}
                    onChange={handleChange}
                    style={{ width: "80%", padding: "10px", margin: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={newArticle.content}
                    onChange={handleChange}
                    style={{ width: "80%", padding: "10px", margin: "5px", borderRadius: "5px", border: "1px solid #ccc", height: "100px" }}
                />
                <button
                    onClick={handleAddArticle}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "white",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}>
                    Add Article
                </button>
            </div>

            {/* Display Articles */}
            <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {articles.map((article) => (
                    <div key={article.id} style={{ width: "200px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px", textAlign: "center", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", backgroundColor: "white" }}>
                        <img src={article.imageUrl} alt={article.title} width="100%" height="150px" style={{ borderRadius: "10px" }} />
                        <h3 style={{ fontSize: "16px", margin: "10px 0", color: "dodgerblue" }}>{article.title}</h3>
                        <button
                            onClick={() => handleDeleteArticle(article.id)}
                            style={{
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#dc3545",
                                color: "white",
                                cursor: "pointer"
                            }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
