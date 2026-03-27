import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className=" bg-cover bg-top bg-[url('https://images.unsplash.com/photo-1552961585-ca72249d4edf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] h-screen pt-8 w-full flex justify-between flex-col">
                <img
                    className="w-16 ml-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <div className="bg-white pb-7 py-5 px-4">
                    <h2 className="text-3xl font-bold">
                        Get Started with Uber
                    </h2>
                    <Link to={'/login'} className="flex item-center justify-center w-full bg-black text-white py-3 rounded-lg mt-4">
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;