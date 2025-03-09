import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Article } from "./types";

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const fetchedArticles: Article[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Article[];
        setArticles(fetchedArticles);
    };

    const handleReadMore = (article: Article) => {
        setSelectedArticle(article);
    };

    const closePopup = () => {
        setSelectedArticle(null);
    };

    return (
        <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
            <nav style={{ backgroundColor: "#007BFF", padding: "15px 20px", textAlign: "center", color: "white", fontSize: "20px", fontWeight: "bold" }}>
                My Articles
            </nav>

            {/* Article Cards */}
            <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {articles.map((article) => (
                    <div key={article.id} style={{ width: "200px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px", textAlign: "center", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", backgroundColor: "white" }}>
                        <img src={article.imageUrl} alt={article.title} width="100%" height="150px" style={{ borderRadius: "10px" }} />
                        <h3 style={{ fontSize: "16px", margin: "10px 0", color: "dodgerblue" }}>{article.title}</h3>
                        <button
                            onClick={() => handleReadMore(article)}
                            style={{
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: "#007BFF",
                                color: "white",
                                cursor: "pointer",
                                marginTop: "5px"
                            }}>
                            Read More
                        </button>
                    </div>
                ))}
            </div>

            {/* Popup for Read More */}
            {selectedArticle && (
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "700px",
                    height: "500px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden" // Prevent parent from scrolling
                }}>
                    {/* Header with fixed title and close button */}
                    <div style={{
                        padding: "15px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span>{selectedArticle.title}</span>
                        <button
                            onClick={closePopup}
                            style={{
                                background: "none",
                                border: "none",
                                color: "white",
                                fontSize: "20px",
                                cursor: "pointer"
                            }}>
                            ✖
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px"
                    }}>
                        <img src={selectedArticle.imageUrl} alt={selectedArticle.title} width="200px" style={{ borderRadius: "10px" }} />
                        <p style={{ fontSize: "16px", marginTop: "20px", color: "#333" }}>{selectedArticle.content}</p>
                    </div>
                </div>
            )}

            {/* Overlay (Blur Background when Popup is Open) */}
            {selectedArticle && (
                <div
                    onClick={closePopup}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999
                    }}>
                </div>
            )}
        </div>
    );
};

export default Home;
