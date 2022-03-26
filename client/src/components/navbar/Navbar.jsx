import React, {useState} from 'react';
import './Navbar.css'
import Logo from '../../assets/img/Logo.png'
import avatarLogo from '../../assets/img/user.png'
import searchLogo from '../../assets/img/search.png'
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {API_URL} from '../../config'
import {getFiles} from '../../actions/file'
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const files = useSelector(state => state.files.files)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const avatarSize = currentUser.avatar ? 42 : 28
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
    const [searchVisible, setSearchVisible] = useState(true)
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="logo" width={60} height={40} className="navbar__logo" />
                <div className="navbar__header">Cloud</div>
                {isAuth && <div className='navbar__search'>
                    <img style={{display : searchVisible ? 'flex' : 'none'}} width={24} height={24} src={searchLogo} alt=''/>
                    <input 
                        className='search__input'
                        value={searchName}
                        onClick={() => setSearchVisible(!searchVisible)}
                        onChange={e => searchChangeHandler(e)} 
                        type="text" placeholder="Поиск..." />
                </div>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch({type : "LOGOUT"})}>Выход</div>}
                {isAuth && <NavLink to="/profile">
                    <img style={{borderRadius : currentUser.avatar ? '50%' : 'none'}} width={avatarSize} height={avatarSize} src={avatar} alt="avatar"/>
                    </NavLink>}
            </div>
        </div>
    );
};

export default Navbar;