import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserHome from './pages/UserHome';
import UserProtectWrapper from './pages/UserProtectWrapper';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/captain-login" element={<CaptainLogin />} />
                <Route path="/captain-signup" element={<CaptainSignup />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/User-Home" element={ <UserProtectWrapper> <UserHome /> </UserProtectWrapper>     } />
            </Routes>
        </div>
    );
}

export default App;
