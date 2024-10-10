import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("useress");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("useress");
        navigate("/Login");
    };

    return (
        <div className="navbar bg-gray-600 text-white p-4 flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4 md:space-x-8">
                <Link to="/Home" className="text-xl md:text-2xl font-bold">
                    BOOKS STORE
                    {/* <img src="https://i.pinimg.com/474x/81/3d/52/813d52a6fa33c3d1a1e5730860b0abe2.jpg" width={20} alt="" /> */}
                </Link>
            </div>

            <Link to="/Favorites" className="text-sm md:text-2sm font-bold">
                Favorites
            </Link>
            <Link to="/ReadBooks" className="text-white hover:text-gray-400">
                Read Books
            </Link>
            <div className="flex items-center space-x-4 md:space-x-8">
                <button
                    onClick={logout}
                    className="bg-pink-400 px-10 py-3 rounded text-xs md:text-sm text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;

