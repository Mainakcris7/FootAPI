import Card from "../components/Card"
import { NavLink } from "react-router-dom"
import aboutCardData from "../utils/about-card-data.json"
import "../styles/About.css"

export default function About() {
    return (
        <>
            <div className="about">
                <h2>About the Footballer API</h2>
                <p>Welcome to the Footballer API, a <strong>free</strong> and <strong>public</strong> API that provides detailed information on football players from around the world. Whether you're building a football-related app, a sports analytics tool, or simply need access to a comprehensive dataset, this API gives you the ability to fetch and filter football player data with ease.</p>
                <div className="get_started">
                    <h3>Get Started</h3>
                    <p className="mt-1">Head over to the <NavLink to="/docs" className="link">documentation</NavLink> to learn more about how to interact with the API and start building your football data project today!</p>
                </div>
                <div className="features">
                    <h3>Key Features</h3>
                    <div className="cards">
                        {
                            aboutCardData.map(data => {
                                return (
                                    <Card title={data.title} text={data.content} color={data.color} key={data.title} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="how_works about-child">
                    <h3>How it works</h3>
                    <ul>
                        <li><strong>Register: </strong> Sign up to receive your free API key.</li>
                        <li><strong>Use the API: </strong> Once you have your API key, you can include it in your requests and start retrieving football player data.</li>
                        <li><strong>Optional parameters: </strong> Tailor the data returned by using optional parameters like <span className="highlight">sortBy</span>, <span className="highlight">limitBy</span>, and <span className="highlight">filterBy</span> for personalized results.</li>
                    </ul>
                </div>
                <div className="why_choose">
                    <h3>Why Choose this API?</h3>
                    <ul>
                        <li><strong>Free & Easy:</strong> Get access to the data with no cost involved and start using it with minimal setup.</li>
                        <li><strong>Flexible:</strong> Designed with flexibility in mind, allowing you to filter, sort, and paginate the data based on your needs.</li>
                        <li><strong>Ideal for Developers:</strong> Perfect for creating apps, websites, or services that need football player statistics and information.</li>
                    </ul>
                </div>
                <div className="problem">
                    <h3>Need Help or Want to Report a Problem?</h3>
                    <p className="mt-2 mb-0">If you encounter any issues, have questions, or would like to report a problem with the API, feel free to reach out to us. We're here to help!</p>
                    <p>Please visit our <NavLink to="/contact" className="link">Contact</NavLink> page to send us a message, and we'll get back to you and fix the problem as soon as possible.</p>
                </div>
            </div>
        </>
    )
}