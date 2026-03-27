import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainSignupData, setCaptainSignupData] = useState({});
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehicletype, setVehicletype] = useState("");
    const [vehicleplate, setVehicleplate] = useState("");
    const [Vehiclecapacity, setVehiclecapacity] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        setCaptainSignupData({
            // becase of the dabase structure we have to send the data in this format
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehicleplate,
                capacity: Vehiclecapacity,
                vehicleType: vehicletype,
            },
        });
        // reset the form after submission
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVehicleColor("");
        setVehicletype("");
        setVehicleplate("");
        setVehiclecapacity("");
        console.log(captainSignupData);
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

                    <h3 className="text-xl mb-2">Tell us about Vehical</h3>
                    {/* Changed to grid layout and moved the bottom margin (mb-7) to the parent container */}
                    <div className="grid grid-cols-4 gap-4 mb-7">
                        <input
                            className="bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full"
                            required
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            type="text"
                            placeholder="Color"
                        />
                        <select
                            value={vehicletype}
                            onChange={(e) => setVehicletype(e.target.value)}
                            className="bg-[#eeeeee] rounded px-4 py-2 text-lg w-full"
                            required
                        >
                            <option value="">Select</option>
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                        </select>

                        <input
                            value={vehicleplate}
                            onChange={(e) => setVehicleplate(e.target.value)}
                            type="text"
                            className="bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full"
                            required
                            placeholder="Vehicle plate"
                        />
                        <input
                            value={Vehiclecapacity}
                            onChange={(e) => setVehiclecapacity(e.target.value)}
                            type="text"
                            className="bg-[#eeeeee] rounded px-4 py-2 text-lg placeholder:text-base w-full"
                            required
                            placeholder="Capacity"
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
                    <Link to={"/captain-login"} className="text-blue-600">
                        Log in
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to={"/signup"}
                    className="flex items-center justify-center bg-[#10b461] text-white font-semibold mt-16 mb-9 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Signup as user
                </Link>
            </div>
        </div>
    );
};

export default CaptainSignup;
