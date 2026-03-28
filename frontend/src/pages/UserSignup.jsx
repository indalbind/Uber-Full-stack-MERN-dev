import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userSignupData, setUserSignupData] = useState({});
    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserDataContext)
    
    const submitHandler =  async (e) => {
        e.preventDefault();

        const userData = { // because of the database structure we have to send the data in this format
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData); // for sending the data to the backend;
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user); // for setting the user data in the context
                localStorage.setItem('token', data.token); // store the token for authenticated requests
                navigate("/"); // for navigating to the home page after successful registration
            }
        } catch (error) {
            if (error.response) {
                // Backend returned an error (400 duplicate email, validation errors, etc.)
                const msg = error.response.data.message || error.response.data.errors?.map(e => e.msg).join(', ') || "Registration failed";
                alert(msg);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }

        // reset the form after submission
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };
  
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-10"
                    src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
                    alt=""
                />
                <form
                    action=""
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-xl mb-2">What is your Name</h3>
                    <div className="flex gap-4">
                        <input
                            className="bg-[#eeeeee] mb-7 w-1/2 rounded px-4 py-2   text-lg placeholder:text-base"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2  text-lg placeholder:text-base"
                            required
                            placeholder="Last Name"
                        />
                    </div>

                    <h3 className="text-xl mb-2">What is your email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        placeholder="email@example.come"
                    />

                    <h3 className="text-xl mb-2">Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        placeholder="password"
                    />

                    <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Sign Up
                    </button>
                </form>

                <p className="text-center">
                    Already have an account?
                    <Link to={"/login"} className="text-blue-600">
                        Log in
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to={"/captain-signup"}
                    className="flex items-center justify-center bg-[#10b461] text-white font-semibold mt-16 mb-9 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Signup as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserSignup;
