import React,{createContext, useState} from 'react';

export const UserDataContext = createContext(); // Create a context for user data

const UserContext = ({ children }) => {
    const [userSignupData, setUserSignupData] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: '',
        },
        password: '' 
        }
    );

    return (
        <div>
            <UserDataContext.Provider value={{}}>
                {children} {/* Render the children components */}
            </UserDataContext.Provider>

        </div>
    )
}

export default UserContext; 