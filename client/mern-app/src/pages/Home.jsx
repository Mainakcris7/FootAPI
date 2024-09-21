import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../utils/Provider"
import { ToastContainer } from "react-toastify"
import RonaldoImg from "../images/ronaldo.png"
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';

import "../styles/Home.css"

export default function Home() {
    const { successMsg, setSuccessMsg, notifySuccess, getUserDetails, user } = useContext(Context)
    const [placeHolderApiKey, setPlaceHolderApiKey] = useState("");
    useEffect(() => {
        if (successMsg) {
            notifySuccess(successMsg)
            setSuccessMsg("")
        }
    })
    useEffect(() => {
        try {
            getUserDetails()
        } catch (err) {
            console.log(err)
        }
    }, [])
    // To hide the apiKey
    useEffect(() => {
        var placeHolder = ""
        for (let i = 0; i < 32; i++) {
            if (i >= 8 && i <= 24) {
                placeHolder += "*"
            } else {
                placeHolder += user.apiKey[i]
            }
        }
        setPlaceHolderApiKey(placeHolder)
    })
    const navigate = useNavigate();
    const navigateToDocs = () => {
        navigate("/docs")
    }
    return (
        <>
            <div className="home-container">
                <div className="key-holder">
                    <h1>Footballer API ⚽</h1>
                    <h2>Get footballers' data for FREE 🎉</h2>
                    <div className="apiKey-div">
                        {!!user.apiKey ?
                            <div id="api-key-container">
                                <span className="fw-bold">Your API key</span>
                                <div id="api-key-home">
                                    {placeHolderApiKey}
                                    <div id="api-icons-home">
                                        <Tooltip title="Copy">
                                            <IconButton color="primary" size="small">
                                                <CopyToClipboard text={user.apiKey}>
                                                    <ContentCopyIcon fontSize="inherit" />
                                                </CopyToClipboard>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div> : null}
                    </div>
                    <Button onClick={navigateToDocs} className="mt-3 btn-started" variant="contained" endIcon={<ArrowForwardIcon />}>Get started</Button>
                </div>
                <div className="image">
                    <img src={RonaldoImg} alt="logo" id="home-logo" />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}