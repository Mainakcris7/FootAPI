import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import pageNotFound from "../images/404_not_found.png"
import { ToastContainer } from "react-toastify"
import "../styles/Error.css"
import { useContext, useEffect } from "react";
import { Context } from "../utils/Provider";

export default function Error() {
    const navigate = useNavigate();
    const { notifyError } = useContext(Context)
    useEffect(() => {
        notifyError("Woops, Page Not Found!")
    }, [])
    return (
        <>
            <div className="error">
                <img src={pageNotFound} alt="" />
                <Button variant="contained" color="primary" onClick={() => navigate("/")} className="error" startIcon={<ArrowBackIcon />}>
                    Back to safety
                </Button>
            </div>
            <ToastContainer />
        </>
    )
}