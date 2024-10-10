import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const Iteminfo = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=7qfhKDV2uQt1gqZcYUOVDlaLfOmr5fAz"
        )
            .then((response) => response.json())
            .then((data) => {
                const selectedBook = data.results.books.find(
                    (book) => book.rank === parseInt(id)
                );
                setBook(selectedBook);
            });
    }, [id]);

    if (!book) return <p>No book found</p>;

    return (

        <>
            <Navbar />
            <div className="flex justify-center p-4">

                <div className="w-[40vw] max-sm:w-[80vw] bg-white shadow-lg rounded-lg p-4">
                    <img
                        src={book.book_image}
                        alt={book.title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">{book.title}</h2>
                        <p className="text-xl text-gray-600">Author: {book.author}</p>
                        <a
                            href={book.buy_links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-800 mt-4 block underline  "
                        >
                            Purchase Book Now 🤩!
                        </a>
                        <div className="mt-6 flex justify-center space-x-4">
                            <Link to="/Home">
                                <button className="bg-pink-400 text-white px-5 py-2 rounded">
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Iteminfo;
