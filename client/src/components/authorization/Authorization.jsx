import React, {useState} from 'react'
import './authorization.css'
import Input from '../../Utils/Input/Input'
import { registration } from '../../actions/user'
export default function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <div className='authorization'>
        <div className="authorization__header">Регистрация</div>
        <Input value={email} setValue={setEmail} type="text" placeholder="Ваша почта"/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Пароль"/>
        <button className="authorization__btn" onClick={() => registration(email,password)}>Зарегистрироваться</button>
    </div>
  )
}
