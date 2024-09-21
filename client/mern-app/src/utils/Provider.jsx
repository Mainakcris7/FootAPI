import { useState, createContext } from "react";
import { toast, Bounce } from 'react-toastify';
import axios from "axios";

export const Context = createContext();

const notifyError = (errMessage) => {
    toast.error(errMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
}
const notifySuccess = (successMessage) => {
    toast.success(`${successMessage}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export function Provider({ children }) {
    const [successMsg, setSuccessMsg] = useState("");
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [user, setUser] = useState({
        id: "",
        email: "",
        apiKey: "",
        iat: 0,
        exp: 0
    });

    const storeToken = (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken);
        setToken(jwtToken)
    }
    const removeToken = () => {
        localStorage.removeItem('jwtToken')
        setUser({
            id: "",
            name: "",
            email: "",
            apiKey: "",
            iat: 0,
            exp: 0
        })
        setToken("")
    }
    const getUserDetails = async () => {
        try {
            const userDetails = await axios.get(`http://localhost:8080/user/details`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setUser(userDetails.data.user)
        } catch (err) {
            console.log(err)
        }
    }
    const updateApiKey = async () => {
        try {
            const userDetails = await axios.get(`http://localhost:8080/user/updateApiKey`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setUser(userDetails.data.user)
            notifySuccess("API key updated successfully!")
        } catch (err) {
            notifyError(err.response.data.error.message)
        }
    }

    return (
        <>
            <Context.Provider value={{ successMsg, setSuccessMsg, notifyError, notifySuccess, storeToken, token, removeToken, getUserDetails, user, updateApiKey }}>
                {children}
            </Context.Provider>
        </>
    )
}