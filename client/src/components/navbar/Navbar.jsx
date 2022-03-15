import React from 'react';
import './Navbar.css'
import Logo from '../../assets/img/Logo.svg'
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="logo" className="navbar__logo" />
                <div className="navbar__header">MERN Cloud</div>
                
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch({type : "LOGOUT"})}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;