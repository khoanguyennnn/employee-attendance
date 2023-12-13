import { createContext, useState } from "react";

const UserContext = createContext({ email: '', auth: false });
// This also works: const UserContext = createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ email: '', auth: true });

    // Login updates the user data with a name parameter
    const loginContext = (email, token) => {
        setUser((user) => ({
            email: email,
            auth: true,
        }));
        localStorage.setItem("accessToken", token);
        localStorage.setItem("email", email);
    };

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };