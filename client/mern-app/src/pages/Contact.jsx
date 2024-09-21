import { useState, useContext, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer } from 'react-toastify';
import { Context } from '../utils/Provider';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../styles/Login.css"
import contactImage from "../images/contact.png"
import "../styles/Contact.css"


export default function Contact() {
    const { notifySuccess, notifyError, user } = useContext(Context);
    const [contactData, setContactData] = useState({
        "email": user.email ? user.email : "",
        "message": ""
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setContactData((prevData) => {
            return { ...prevData, [field]: value }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(contactData)
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/contact",
                JSON.stringify(contactData),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.statusText === "OK") {
                notifySuccess("Message sent successfully!")
            }
            setContactData({
                email: "",
                message: ""
            })
        } catch (err) {
            console.log(err)
            notifyError(err.response.data.error.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <div className="contact-container">
                <div className="contact-banner">
                    <img src={contactImage} alt="contact-image" />
                </div>
                <div className="contact-form">
                    <form action="/contact" onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Your email</label>
                            <input type="email" name="email" className="form-control" id="email" aria-describedby="email" autoComplete='off' value={contactData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Your message</label>
                            <textarea name="message" className="form-control" id="message" aria-describedby="message" value={contactData.message} onChange={handleChange} rows={5} />
                        </div>
                        <LoadingButton loading={loading} className="mt-3 btn-login" variant="contained" endIcon={<SendIcon />} loadingPosition="end" type='submit'>
                            Submit
                        </LoadingButton>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}