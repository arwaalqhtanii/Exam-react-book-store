
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    if (favorites.length === 0) {
        return (
            <>
                <Navbar />
                <p className="text-center mt-10">No favorite books.</p>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-5 text-pink-800 p-7">Your Favorite Books</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favorites.map((book) => (
                        <div key={book.rank} className="card bg-white shadow-lg rounded-lg">
                            <figure>
                                <img
                                    src={book.book_image}
                                    alt={book.title}
                                    className="w-full h-64 object-cover"
                                />
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="card-title text-xl font-bold text-gray-800">{book.title}</h3>
                                <p className="text-md font-serif text-gray-900">By: {book.author}</p>
                                <Link to={`/Iteminfo/${book.rank}`}>
                                    <button className="bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600 transition duration-200 mt-4">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Favorites;
