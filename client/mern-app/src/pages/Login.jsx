import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import { ToastContainer } from 'react-toastify';
import { Context } from '../utils/Provider';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/Login.css"
import logInImage from "../images/login.png"

export default function Login() {
    const { successMsg, notifySuccess, setSuccessMsg, notifyError, storeToken, user } = useContext(Context)
    useEffect(() => {
        if (successMsg) {
            notifySuccess(successMsg)
            setSuccessMsg("")
        }
        if (user.id != "") {
            setSuccessMsg("You are already logged in")
            navigate("/")
        }

    })

    const [logInData, setLogInData] = useState(() => {
        return {
            email: "",
            password: ""
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setLogInData((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true)
            const result = await axios.post("http://localhost:8080/auth/login",
                JSON.stringify(logInData),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            // Store data in localStorage
            storeToken(result.data.token)

            setSuccessMsg(`Welcome back ${result.data.user.name}!`)
            setLogInData({
                email: "",
                password: ""
            })
            navigate("/")
        } catch (err) {
            notifyError(err.response.data.error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="login-banner">
                    <img src={logInImage} alt="login-image" />
                </div>
                <div className="login-form">
                    <form id="login" onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="email" aria-describedby="email" autoComplete='off' value={logInData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="password">
                                <input type={showPassword ? "text" : "password"} name="password" className="form-control" id="password" aria-describedby="password" value={logInData.password} onChange={handleChange} />
                                <IconButton color='primary' size='small' onClick={() => setShowPassword(!showPassword)} className='password-hide-btn'>
                                    {
                                        showPassword ?
                                            <VisibilityOffTwoToneIcon fontSize='inherit' /> :
                                            <VisibilityTwoToneIcon fontSize='inherit' />

                                    }
                                </IconButton>
                            </div>

                        </div>
                        <LoadingButton loading={loading} className="mt-3 btn-login" variant="contained" endIcon={<SendIcon />} loadingPosition="end" type='submit'>
                            Log in
                        </LoadingButton>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}