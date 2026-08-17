import "../styles/Notfound.css";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-page">
            <div className="notfound-card">

                <span className="notfound-code">
                    404
                </span>

                <h1>
                    Page Not Found
                </h1>

                <p>
                    Sorry, the page you are looking for does not exist.
                </p>

                <button
                    className="notfound-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Users
                </button>

            </div>
        </div>
    );
};

export default Notfound;