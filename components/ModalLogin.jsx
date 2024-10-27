
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalLogin.css';
import { removeallCartItem } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeallWishItem } from '../store/slices/wishListSlice';

export default function ModalLogin({ islog, setislog  ,setusername ,setuserlogin}) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

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
    const handleLogin = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find the user with the matching username and password
        const user = existingUsers.find(
            user => 
                user.username === loginData.username && 
                user.password === loginData.password
        );
    
        if (user) {
            alert('Successfully logged in!');
            setusername(user.username);
            localStorage.setItem('username', user.username); // Store the username in localStorage
            dispatch(removeallCartItem());
            dispatch(removeallWishItem());
            setuserlogin(true);
            setislog(false);
        } else {
            alert('Login failed. Username or password is incorrect.');
        }
    
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
