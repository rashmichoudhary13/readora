import { supabase } from "./Supabase"
import { createContext, useContext } from "react"

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const SignUpNewUser = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                }
            }
        });

        if (error) {
            console.log("Signup Failed: " + error.message);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    }

    const GoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.log("Google Sign-in error:", error.message);
        }
    };

    const signInUser = async (email, password) => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log("Login Failed: " + error.message);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    }

    return (
        <AuthContext.Provider value={{ SignUpNewUser, GoogleSignIn, signInUser }}>
            {children}
        </AuthContext.Provider>
    )
}