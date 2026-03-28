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
    const [user, setUser] = useState(null); // State to hold the user data
    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {/* Provide the user data and the function to update it to the children components */}
                {children} {/* Render the children components */}
            </UserDataContext.Provider>
        </div>
    );
}

export default UserContext; 