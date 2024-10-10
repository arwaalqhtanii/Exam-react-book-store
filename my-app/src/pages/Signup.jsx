import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const validation = () => {
        if (!name) {
            setMessage("Name is required");
            return false;
        }
        if (!email) {
            setMessage("Email is required");
            return false;
        }
        if (!password) {
            setMessage("Password is required");
            return false;
        } else if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return false;
        }
        setMessage("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            axios
                .post("https://66e7e6bbb17821a9d9da704c.mockapi.io/home", {
                    name: name,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    localStorage.setItem("userdata", JSON.stringify(response.data));
                    navigate("/Login");
                })
                .catch((error) => {
                    console.error("Error creating account:", error);
                    setMessage("There was a problem creating your account. Please try again.");
                });
        }
    };

    return (
        <section>

            <div className="flex flex-col items-center justify-center py-8 ">
                <div className="w-full bg-pink-100 rounded-lg shadow p-9 max-w-md">
                    <h1 className="text-xl font-bold mb-6">Sign up </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                placeholder="Your Name"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Your Email</label>
                            <input
                                type="email"
                                value={email}
                                placeholder="Example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password must be at least 5 characters"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        {message && (
                            <div className="text-red-500 mb-4">
                                <span>{message}</span>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full p-2 bg-pink-800 text-white rounded "
                        >
                            Sign up
                        </button>
                        <p className="mt-4 text-sm">
                            Do you have an account?{" "}
                            <Link to="/Login" className="text-blue-600">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
