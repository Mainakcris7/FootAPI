import { useContext, useEffect, useState } from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer } from 'react-toastify';
import { Context } from '../utils/Provider';
import IconButton from '@mui/material/IconButton';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Register.css"
import registerImage from "../images/register.jpg"

export default function Register() {
    const { setSuccessMsg, user, notifyError, storeToken } = useContext(Context)
    useEffect(() => {
        if (user.id != "") {
            setSuccessMsg("You are already registered")
            navigate("/")
        }
    })
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const field = event.target.name
        const value = event.target.value

        setRegisterData((prevData) => {
            return {
                ...prevData,
                [field]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true)
            const result = await axios.post("http://localhost:8080/auth/signup",
                JSON.stringify(registerData),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            storeToken(result.data.token)
            setSuccessMsg("Welcome to our app!")
            setRegisterData({
                name: "",
                email: "",
                password: ""
            })
            navigate("/")
        } catch (err) {
            console.log(err)
            notifyError(err.response.data.error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="register-container">
                <div className="register-banner">
                    <img src={registerImage} />
                </div>
                <div className="register-form">
                    <form id="register" onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input type="name" name="name" className="form-control" id="name" aria-describedby="name" autoComplete='off' value={registerData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="email" aria-describedby="email" autoComplete='off' value={registerData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="password">
                                <input type={showPassword ? "text" : "password"} name="password" className="form-control" id="password" aria-describedby="password" value={registerData.password} onChange={handleChange} />
                                <IconButton color='primary' size='small' onClick={() => setShowPassword(!showPassword)} className='password-hide-btn'>
                                    {
                                        showPassword ?
                                            <VisibilityOffTwoToneIcon fontSize='inherit' /> :
                                            <VisibilityTwoToneIcon fontSize='inherit' />

                                    }
                                </IconButton>
                            </div>
                        </div>
                        <LoadingButton loading={loading} className="mt-3 btn-register" variant="contained" endIcon={<SendIcon />} loadingPosition="end" type='submit'>
                            Register
                        </LoadingButton>
                    </form>
                </div >
                <ToastContainer />
            </div >
        </>
    )
}