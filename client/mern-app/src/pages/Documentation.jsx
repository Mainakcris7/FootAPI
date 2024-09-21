import { useContext, useEffect } from "react"
import { Context } from "../utils/Provider"
import { NavLink } from "react-router-dom"
import "../styles/Docs.css"
import DataFields from "../components/DataFields"
import ApiURL from "../components/ApiURL"

export default function Documentation() {

    const { getUserDetails, user } = useContext(Context)
    useEffect(() => {
        try {
            getUserDetails()
        } catch (err) { }
    })

    return (
        <>
            <div className="docs">
                <h2>Footballer API Documentation</h2>
                <span id="api-doc-title">
                    The Footballer API provides access to a wide range of football player statistics, including player names, goals, assists, nationality, and club history. The API is <strong>completely free</strong>  to use, and it allows users to access the data after registering and obtaining an API key.
                </span>
                <div className="note">
                    <strong>Note: </strong>
                    <span>The database is last updated at <span className="highlight">01/09/2024</span></span>
                </div>
                <div className="field-description">
                    <h3>Data Fields</h3>
                    <span className="margin-2 mb-3">
                        Each football player in the API response contains the following fields:
                    </span>
                    <DataFields />
                </div>
                <div className="authentication-doc">
                    <h3>API Key</h3>
                    <span className="margin-2">
                        To use this API, you need an API key. <NavLink to="/register" className="link">Register</NavLink> to receive your key, and include it in your requests as the <span className="highlight">apiKey</span> parameter.
                    </span>
                </div>
                <div className="endpoints">
                    <h3>Endpoints</h3>
                    <span className="margin-2">
                        To retrieve all available football player data, simply make a <span className="highlight">GET</span> request to the following endpoint, including your API key.
                    </span>
                    <div className="api-urls">
                        <ApiURL method="GET"
                            apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}
                        `}
                        />
                        <div className="optional-params">
                            <div className="description">
                                <h4>Optional parameters</h4>
                                <span>Our API supports various optional parameters to help you format and customize the response:</span>
                            </div>
                            <div className="optional-param">
                                <h5>1. limitBy</h5>
                                <p className="optional-param-desc">Limit the number of players returned in the response. The following example only returns <strong>5 data.</strong>
                                </p>
                                <ApiURL method="GET"
                                    apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}&limitBy=5`}
                                />
                            </div>
                            <div className="optional-param">
                                <h5>2. sortBy</h5>
                                <p className="optional-param-desc">Sort the data in ascending order by the specified field (e.g., <span className="highlight">name</span>, <span className="highlight">goals</span>, <span className="highlight">nationality</span>, etc.). The following example returns the <strong>sorted data in ascending order w.r.t the goals.</strong>
                                </p>
                                <ApiURL method="GET"
                                    apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}&sortBy=goals`}
                                />
                            </div>
                            <div className="optional-param">
                                <h5>3. sortByDesc</h5>
                                <p className="optional-param-desc">Sort the data in descending order by the specified field (e.g., <span className="highlight">name</span>, <span className="highlight">goals</span>, <span className="highlight">nationality</span>, etc.). The following example returns the <strong>sorted data in descending order w.r.t the assists.</strong>
                                </p>
                                <ApiURL method="GET"
                                    apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}&sortByDesc=assists`}
                                />
                            </div>
                            <div className="optional-param">
                                <h5>4. filterBy with value</h5>
                                <p className="optional-param-desc">Filter the player data based on a specific field and value. The filterBy parameter specifies the field, and the value parameter applies a regular expression to match the desired results, and it is <strong>case-insensitive</strong>. The following example returns only the <strong>players' data who plays for Real Madrid.</strong>
                                </p>
                                <ApiURL method="GET"
                                    apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}&filterBy=club&value=real madrid`}
                                />
                            </div>
                            <div className="optional-param">
                                <p className="optional-param-desc"><strong>These optional parameters can also be combined to refine the results</strong>. For instance, you can sort the players by goals in descending order and limit the output to 5 players.
                                </p>
                                <ApiURL method="GET"
                                    apiUrl={`http://localhost:8080/api/v1/data?apiKey=${user.apiKey ? user.apiKey : "<YOUR_API_KEY>"}&sortByDesc=goals&limitBy=5`}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}