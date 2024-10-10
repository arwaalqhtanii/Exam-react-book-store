import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBookmark } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const savedReadBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
        setFavorites(savedFavorites);
        setReadBooks(savedReadBooks);
    }, []);

    const addToFavorites = (book) => {
        if (!favorites.some(fav => fav.rank === book.rank)) {
            const updatedFavorites = [...favorites, book];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
        navigate("/favorites");
    };

    const markAsRead = (book) => {
        if (!readBooks.some((b) => b.rank === book.rank)) {
            const updatedReadBooks = [...readBooks, book];
            setReadBooks(updatedReadBooks);
            localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));
        }
        navigate("/ReadBooks");
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            const filteredItems = items.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setItems(filteredItems);
        } else {
            fetchItems();
        }
    };

    const fetchItems = () => {
        fetch(
            "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=7qfhKDV2uQt1gqZcYUOVDlaLfOmr5fAz"
        )
            .then((response) => response.json())
            .then((data) => setItems(data.results.books))


            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center mt-10 ">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Book Library</h1>
                <p className="text-gray-600 text-2xl mb-8">Discover your next great read here 🤩!</p>
            </div>

            <div className="flex justify-center gap-2 mt-5 w-full">
                <input
                    type="text"
                    className="rounded-lg p-2 border border-black px-9"
                    placeholder="Search for a book..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 p-4 ">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.rank} className="card bg-pink-100 w-96 shadow-lg mt-6 rounded-lg text-gray-700 ">
                            <figure>
                                <img
                                    src={item.book_image}
                                    alt={item.title}
                                    className="w-full h-64 object-cover rounded "
                                />
                            </figure>
                            <div className="card-body p-4 rounded ">
                                <h2 className="card-title text-xl font-bold text-gray-800">{item.title}</h2>
                                <p className="text-md font-serif text-gray-900">By: {item.author}</p>
                                <p className="text-sm text-gray-500 font-mono">
                                    {item.description || "No description available."}
                                </p>
                                <div className="card-actions justify-center mt-4">
                                    <Link to={`/Iteminfo/${item.rank}`}>
                                        <button className="bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600 transition duration-200">
                                            Read Now
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-transparent text-pink-500 px-5 py-2 rounded ml-2 hover:text-pink-600 transition duration-200"
                                        onClick={() => addToFavorites(item)}
                                    >
                                        <FaHeart size={24} />
                                    </button>
                                    <button
                                        className="bg-transparent text-blue-500 px-5 py-2 rounded ml-2 hover:text-blue-600 transition duration-200"
                                        onClick={() => markAsRead(item)}
                                    >
                                        <FaBookmark size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-600 mt-8">No books found 💀 .</p>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Home;
