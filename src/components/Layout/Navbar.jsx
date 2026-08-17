import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    }

    return (
        <nav>
            <h2>User Dashboard</h2>

            <div>
                {!isLoggedIn && (
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                        to="/login"
                    >
                        Login
                    </NavLink>
                )}

                {isLoggedIn && (
                    <>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                            to="/"
                        >
                            Users
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                            to="/about"
                        >
                            About
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;