import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {API_URL} from '../../config'
import avatarLogo from '../../assets/img/user.png'
import './profile.css'
import {NavLink} from 'react-router-dom'
import {deleteAvatar, uploadAvatar} from '../../actions/user'
export default function Profile() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
  function changeHandler(e){
    const file = e.target.files[0];
    dispatch(uploadAvatar(file))
  }
  return (
    <>
      <NavLink style={{margin : '10px 0 0 30px'}} to="/">Назад</NavLink>
      <div className='profile'>
        <img className='avatar' src={avatar} alt=''/>
        <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
        <input className='profileInput'  accept='image/*' onChange={e => changeHandler(e)} type="file" placeholder='Загрузить аватар' />
    </div>
    </>
  )
}
