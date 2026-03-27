import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userSignupData, setUserSignupData] = useState({});
    
    const submitHandler = (e) => {
        e.preventDefault();
        setUserSignupData({ // becase of the dabase structure we have to send the data in this format
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        });
        console.log(userSignupData);

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
