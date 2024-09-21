import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../utils/Provider"
import userIcon from "../images/user.png"
import { Tooltip, IconButton, Button } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import MessageIcon from '@mui/icons-material/Message';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import "../styles/Profile.css";
import CopyToClipboard from "react-copy-to-clipboard"
import { ToastContainer } from "react-toastify"


export default function Profile() {
    const { removeToken, setSuccessMsg, user, getUserDetails, updateApiKey } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getUserDetails()
        } catch (err) {
            console.log(err)
        }
    }, [])


    const removeJwtToken = () => {
        removeToken();
        navigate("/login")
        setSuccessMsg("Logged out successfully!")
    }
    return (
        <>
            <div className="profile">
                <div className="profile-banner">
                    <img src={userIcon} alt="" />
                </div>
                <div className="user-details">
                    <h2>Hey, {user.name}👋</h2>
                    <h4 className="mt-3 text-center">
                        <MarkEmailReadRoundedIcon color="success" />
                        <span className="ms-2">{user.email}</span>
                    </h4>
                    <div className="apiKey-div">
                        {!!user.apiKey ?
                            <div id="api-key-container">
                                <span className="fw-bold">Your API key</span>
                                <div id="api-key">
                                    {user.apiKey}
                                    <div id="api-icons">
                                        <Tooltip title="Copy">
                                            <IconButton color="primary" size="small">
                                                <CopyToClipboard text={user.apiKey}>
                                                    <ContentCopyIcon fontSize="inherit" />
                                                </CopyToClipboard>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Regenerate">
                                            <IconButton color="primary" size="medium" onClick={updateApiKey}>
                                                <CachedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div> : null}
                    </div>
                    <div className="btn-group">
                        <Button variant="contained" startIcon={<MessageIcon />} onClick={() => navigate("/contact")}>Contact</Button>
                        <Button variant="contained" className="logout" startIcon={<DeleteIcon />} color="error" onClick={removeJwtToken}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}
