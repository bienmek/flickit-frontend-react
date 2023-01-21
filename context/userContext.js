import {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from "../firebase";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification
} from "firebase/auth";
import {collection, getDocs, query, where} from "firebase/firestore";

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorContext, setErrorContext] = useState("");
    const [updateContext, setUpdateContext] = useState(0);

    useEffect(() => {
        setLoading(true);
        return onAuthStateChanged(auth, (res) => {
            if (res) {
                setUser(res);
            } else {
                setUser(null);
            }
            setErrorContext("")
            setLoading(false);
        });
    }, [updateContext]);


    const registerUser = async (username, email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        signOut(auth)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const sendEmail = () => {
        setLoading(true)
        sendEmailVerification(auth.currentUser, {
            handleCodeInApp: true,
            url: "https://flick-it-373707.firebaseapp.com"
        })
            .then(() => setLoading(false))
            .catch((err) => console.error(err))
    }


    const contextValue = {
        user,
        loading,
        errorContext,
        setLoading,
        setUpdateContext,
        updateContext,
        registerUser,
        loginUser,
        logoutUser,
        forgotPassword,
        sendEmail
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}