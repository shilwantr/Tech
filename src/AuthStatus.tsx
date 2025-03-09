// src/AuthStatus.tsx
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthStatus = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup
    }, []);

    return <div>{user ? `Logged in as: ${user.email}` : "Not logged in"}</div>;
};

export default AuthStatus;
