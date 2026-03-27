import React, { useState } from 'react';
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userLoginData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setEmail('')
        setPassword('')
        setUserData({
            email: email,
            password: password
        })
        console.log(userLoginData);
        
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