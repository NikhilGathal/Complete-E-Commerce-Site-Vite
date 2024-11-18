
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalLogin.css';
import { removeallCartItem } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeallWishItem } from '../store/slices/wishListSlice';
import { useNavigate } from 'react-router-dom';

export default function ModalLogin({ islog, setislog  ,setusername ,setuserlogin , setIsAdmin}) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle Log In (Validate with localStorage)
    // const handleLogin = () => {
    //     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    //     // Find the user with the matching username and password
    //     const user = existingUsers.find(
    //         user => 
    //             user.username === loginData.username && 
    //             user.password === loginData.password
    //     );
    
    //     if (user) {
    //         alert('Successfully logged in!');
    //         setusername(user.username);
    //         localStorage.setItem('username', user.username); // Store the username in localStorage
    //         dispatch(removeallCartItem());
    //         dispatch(removeallWishItem());
    //         setuserlogin(true);
    //         setislog(false);
    //     } else {
    //         alert('Login failed. Username or password is incorrect.');
    //     }
    
    //     setLoginData({
    //         username: '',
    //         password: ''
    //     });
    // };


    const handleLogin = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Admin credentials
        const adminUsername = 'Admin';
        const adminPassword = 'password';

        // Check if login is for admin
        if (loginData.username === adminUsername && loginData.password === adminPassword) {
            alert('Admin logged in successfully!');
            setusername(loginData.username);
            localStorage.setItem('username', loginData.username);
            setIsAdmin(true);  // Indicate user is an admin
            setuserlogin(true);
            setislog(false);

            navigate('/Admin');
            setLoginData({ username: '', password: '' });
            return;
        }

        // Check if login is for a regular user
        const user = existingUsers.find(
            user => 
                user.username === loginData.username && 
                user.password === loginData.password
        );

        if (user) {
            alert('Successfully logged in as User!');
            setusername(user.username);
            localStorage.setItem('username', user.username);
            dispatch(removeallCartItem());
            dispatch(removeallWishItem());
            setuserlogin(true);
            setIsAdmin(false); // Indicate user is a regular user
            setislog(false);
            navigate('/');
        } else {
            alert('Login failed. Username or password is incorrect.');
        }

        // Reset login data after attempt
        setLoginData({
            username: '',
            password: ''
        });
    };
    




    return createPortal(
        <div onClick={() => setislog(false)} className={`modal-overlay-log ${islog ? '' : 'hidden'}`}>
            <div onClick={(e) => e.stopPropagation()} className="modal-box-log">
                <div className="modal-heading">LogIn</div>
                <div className="modal-form">
                    <input
                        placeholder="Username"
                        className="modal-input"
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        className="modal-input"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={() => setislog(false)} className="cancel-button">Cancel</button>
                    <button onClick={handleLogin} className="login-button">LogIn</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}
