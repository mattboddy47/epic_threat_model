import { React, useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GithubAuthProvider,
    OAuthProvider ,
 } from "firebase/auth";
import {auth} from '../firebase'
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(
            error => {
                switch (error.message){
                    case "Firebase: Error (auth/account-exists-with-different-credential).":
                        toast.error("Your email is already registed via a different sign in method.");
                    break;
                    default:
                        toast.error("An error occured whilst signing in!");

                }
            });
    }

    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
        .catch(
            error => {
                switch (error.message){
                    case "Firebase: Error (auth/account-exists-with-different-credential).":
                        toast.error("Your email is already registed via a different sign in method.");
                    break;
                    default:
                        toast.error("An error occured whilst signing in!");

                }
            });
    }

    const microsoftSignIn = () => {
        const provider = new OAuthProvider('microsoft.com');
        signInWithPopup(auth, provider)
        .catch(
            error => {
                switch (error.message){
                    case "Firebase: Error (auth/account-exists-with-different-credential).":
                        toast.error("Your email is already registed via a different sign in method.");
                    break;
                    default:
                        toast.error("An error occured whilst signing in!");

                }
            });
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser, currentUser);
            console.log('User', currentUser)
        })
        return () => {
            unsubscribe();
        }
}, [])

    return (
        <AuthContext.Provider value={{ microsoftSignIn, githubSignIn, googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}