import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';



const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userLoginData, setUserData] = useState({});

    const navigate = useNavigate(); // for navigating to the home page after successful login
    const { user, setUser } = React.useContext(UserDataContext)
    
    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData); // for sending the data to the backend;

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user); // for setting the user data in the context -> why the data.user here ? because of data are 
                

                localStorage.setItem('token', data.token); // store the token for authenticated requests
                navigate("/User-Home"); // for navigating to the home page after successful login
            }
        } catch (error) {
            if (error.response) {
                // Backend returned an error (401, 400, etc.)
                alert(error.response.data.message || "Invalid email or password");
            } else {
                alert("Something went wrong. Please try again.");
            }
        }

        setEmail("");
        setPassword("");
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
                    <h3 className="text-xl mb-2">What is your email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        placeholder="email@example.come"
                    />

                    <h3 className="text-xl mb-2">Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        placeholder="password"
                    />

                    <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Login
                    </button>
                </form>

                <p className="text-center">
                    {" "}
                    New here?{" "}
                    <Link to={"/signup"} className="text-blue-600">
                        {" "}
                        Create new Account
                    </Link>{" "}
                </p>
            </div>

            <div>
                <Link
                    to={"/captain-login"}
                    className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
}

export default UserLogin;