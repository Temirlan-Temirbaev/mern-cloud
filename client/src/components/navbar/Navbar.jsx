import React, {useState} from 'react';
import './Navbar.css'
import Logo from '../../assets/img/Logo.svg'
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {getFiles} from '../../actions/file'
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const files = useSelector(state => state.files.files)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    function searchChangeHandler(e){
        setSearchName(e.target.value)
        const filteredFiles = files.filter(file => file.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if(e.target.value !== '') {
            dispatch({type : "SET_FILES", payload : filteredFiles})
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="logo" className="navbar__logo" />
                <div className="navbar__header">MERN Cloud</div>
                {isAuth && <input 
                value={searchName}
                onChange={e => searchChangeHandler(e)}
                className='navbar__search' 
                type="text" placeholder="Поиск..." />}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch({type : "LOGOUT"})}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;