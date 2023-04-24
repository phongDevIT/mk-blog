import { auth, db } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const value = { userInfo, setUserInfo };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = query(
                    collection(db, "users"),
                    where("email", "==", user.email)
                );
                onSnapshot(docRef, (snapshot) => {
                    snapshot.forEach((doc) => {
                        setUserInfo({
                            ...user,
                            ...doc.data(),
                        });
                    });
                });
                // setUserInfo(user);
            } else {
                setUserInfo(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
    );
}
function useAuth(props) {
    const context = useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be undefined");
    return context;
}

export { AuthProvider, useAuth };
