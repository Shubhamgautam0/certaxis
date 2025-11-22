import React, { createContext, useContext, useEffect, useState} from "react";

interface AuthContextType {
    isAuthenticated : boolean;
    // isAdmin?: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: ()=> void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
useEffect(() => {
    const storeData = localStorage.getItem("user");
    if(storeData){
        setIsAuthenticated(true);
        setLoading(false);
    }
},[])
    const login = async (email: string, password: string) => {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser.email === email && storedUser.password === password) {
            setIsAuthenticated(true);
        } else {
            throw new Error("Invalid credentials");
        }
        setLoading(false);
    }


const logout = () => {
        setIsAuthenticated(false);
        // localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};