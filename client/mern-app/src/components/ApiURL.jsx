import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import "../styles/ApiUrl.css"
export default function ApiURL({ method, apiUrl }) {
    return (
        <>
            <div className="outer-code">
                <div className="show-url">
                    <span className="method" style={{
                        backgroundColor: method == "GET" ? "#0f86f5" : "green"
                    }}>
                        {method}
                    </span>

                    <span className="url">{apiUrl}</span>

                    <span className="copy_icon">
                        <Tooltip title="Copy">
                            <IconButton color="primary" size="small">
                                <CopyToClipboard text={apiUrl}>
                                    <ContentCopyIcon fontSize="inherit" />
                                </CopyToClipboard>
                            </IconButton>
                        </Tooltip>
                    </span>
                </div>
            </div>
        </>)
}