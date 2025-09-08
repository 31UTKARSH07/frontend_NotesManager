import React,{ createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../lib/axios";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const checkUserStatus = async() => {
            try {
                const {data} = await api.get('/refresh');
                setAccessToken(data.data.accessToken);

                const profileResponse = await api.post('/profile');
                setUser(profileResponse.data.data.user);
            } catch (error) {
                setUser(null);
                setAccessToken('');
            }finally{
                setLoading(false);
            }
        }
        checkUserStatus();
    },[]);

    const login = async (email,password) => {
        try {
            const response = await api.post('/login',{email,password});
            const {user,accessToken} = response.data.data;

            setUser(user);
            setAccessToken(accessToken);
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed",error.response.data);
        }
    }
    const register = async (name,email,password) => {
        try {
            const response = await api.post('/register',{name,email,password});
            const {user,accessToken} = response.data.data;

            setUser(user);
            setAccessToken(accessToken);
            navigate('/dashboard');
        } catch (error) {
            console.error("Registration failed",error.response.data);
        }
    }
    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Logout failed",error.response.data);
        }finally{
            setUser(null);
            setAccessToken('');
            navigate('/login');
        }
    }

    return(
        <AuthContext.Provider value={{user,loading,login,register,logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;