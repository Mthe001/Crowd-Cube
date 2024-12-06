// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase/firebase.config';
// import {
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut,
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     GithubAuthProvider,
//     TwitterAuthProvider,
//     RecaptchaVerifier,
//     signInWithPopup,
//     signInWithPhoneNumber,
//     updateProfile, // Used to update displayName and photoURL
// } from 'firebase/auth';

// // Initialize providers for social login
// const providers = {
//     google: new GoogleAuthProvider(),
//     facebook: new FacebookAuthProvider(),
//     github: new GithubAuthProvider(),
//     twitter: new TwitterAuthProvider(),
// };

// // Create contexts
// export const AuthContext = createContext();
// export const ThemeContext = createContext();

// const AuthProvider = ({ children }) => {
//     // Authentication state
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Theme state
//     const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

//     // Set up authentication state listener on mount
//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setUser(user);
//             setLoading(false);
//         });
//         return unsubscribe;
//     }, []);

//     // Persist theme preference in localStorage and apply it
//     useEffect(() => {
//         document.documentElement.className = theme;  // Apply to html
//         document.body.className = theme;  // Apply to body
//         localStorage.setItem('theme', theme);  // Save theme to localStorage
//     }, [theme]);

//     // Toggle between light and dark themes
//     const toggleTheme = () => {
//         setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//     };

//     // Authentication methods
//     const signUpWithEmailPassword = async (email, password) => {
//         try {
//             return await createUserWithEmailAndPassword(auth, email, password);
//         } catch (error) {
//             console.error("Sign-Up Error:", error);
//             throw error;
//         }
//     };

//     const loginWithEmailPassword = async (email, password) => {
//         try {
//             return await signInWithEmailAndPassword(auth, email, password);
//         } catch (error) {
//             console.error("Login Error:", error);
//             throw error;
//         }
//     };

//     const signInWithProvider = async (provider) => {
//         try {
//             return await signInWithPopup(auth, providers[provider]);
//         } catch (error) {
//             console.error(`${provider} Login Error:`, error);
//             throw error;
//         }
//     };

//     const signInWithPhone = async (phoneNumber, appVerifier) => {
//         try {
//             return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//         } catch (error) {
//             console.error("Phone Login Error:", error);
//             throw error;
//         }
//     };

//     const setUpRecaptcha = (container) => {
//         return new RecaptchaVerifier(
//             container,
//             { size: 'invisible' },
//             auth
//         );
//     };

//     const logout = async () => {
//         try {
//             await signOut(auth);
//             setUser(null);
//         } catch (error) {
//             console.error("Logout Error:", error);
//             throw error;
//         }
//     };

//     // Update the user's profile (without updating the email)
//     const updateUserProfile = async (displayName, photoURL) => {
//         const user = auth.currentUser;

//         try {
//             // Update profile information (only display name and photo URL)
//             await updateProfile(user, {
//                 displayName,
//                 photoURL,
//             });

//             // Update the user state with new profile info
//             setUser({ ...user, displayName, photoURL });
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             throw error;
//         }
//     };

//     // Provide state and methods to children
//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 loading,
//                 signUpWithEmailPassword,
//                 loginWithEmailPassword,
//                 signInWithGoogle: () => signInWithProvider('google'),
//                 signInWithFacebook: () => signInWithProvider('facebook'),
//                 signInWithGithub: () => signInWithProvider('github'),
//                 signInWithTwitter: () => signInWithProvider('twitter'),
//                 signInWithPhone,
//                 setUpRecaptcha,
//                 logout,
//                 updateUserProfile,  // Expose updateUserProfile method
//             }}
//         >
//             <ThemeContext.Provider value={{ theme, toggleTheme }}>
//                 {children}
//             </ThemeContext.Provider>
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase.config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
    RecaptchaVerifier,
    signInWithPopup,
    signInWithPhoneNumber,
    updateProfile,
} from 'firebase/auth';

// Initialize providers for social login
const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
    twitter: new TwitterAuthProvider(),
};

// Create contexts
export const AuthContext = createContext();
export const ThemeContext = createContext();

// Create a custom hook to access AuthContext
export const useAuth = () => {
    return useContext(AuthContext); // This will allow components to access the auth context
};

const AuthProvider = ({ children }) => {
    // Authentication state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Theme state
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    // Set up authentication state listener on mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Persist theme preference in localStorage and apply it
    useEffect(() => {
        document.documentElement.className = theme;  // Apply to html
        document.body.className = theme;  // Apply to body
        localStorage.setItem('theme', theme);  // Save theme to localStorage
    }, [theme]);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Authentication methods
    const signUpWithEmailPassword = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign-Up Error:", error);
            throw error;
        }
    };

    const loginWithEmailPassword = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const signInWithProvider = async (provider) => {
        try {
            return await signInWithPopup(auth, providers[provider]);
        } catch (error) {
            console.error(`${provider} Login Error:`, error);
            throw error;
        }
    };

    const signInWithPhone = async (phoneNumber, appVerifier) => {
        try {
            return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        } catch (error) {
            console.error("Phone Login Error:", error);
            throw error;
        }
    };

    const setUpRecaptcha = (container) => {
        return new RecaptchaVerifier(
            container,
            { size: 'invisible' },
            auth
        );
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        }
    };

    // Update the user's profile (without updating the email)
    const updateUserProfile = async (displayName, photoURL) => {
        const user = auth.currentUser;

        try {
            await updateProfile(user, {
                displayName,
                photoURL,
            });

            // Update the user state with new profile info
            setUser({ ...user, displayName, photoURL });
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    // Provide state and methods to children
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signUpWithEmailPassword,
                loginWithEmailPassword,
                signInWithGoogle: () => signInWithProvider('google'),
                signInWithFacebook: () => signInWithProvider('facebook'),
                signInWithGithub: () => signInWithProvider('github'),
                signInWithTwitter: () => signInWithProvider('twitter'),
                signInWithPhone,
                setUpRecaptcha,
                logout,
                updateUserProfile,  // Expose updateUserProfile method
            }}
        >
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
