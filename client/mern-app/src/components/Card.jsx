import "../styles/Card.css"

export default function Card({ title, text, color: bgColor }) {
    return (
        <>
            <div className="about-card" style={{ backgroundColor: bgColor }}>
                <p className="card-title">{title}</p>
                <p className="card-content">{text}</p>
            </div>
        </>
    )
}