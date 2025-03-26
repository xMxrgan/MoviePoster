import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
    // Cambiato "navBar" in "NavBar"
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie app</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                <Link to="/favorite" className="nav-link">
                    Favorite
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
