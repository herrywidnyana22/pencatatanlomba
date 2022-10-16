import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, reset } from '../../features/authSlice'

import './Login.css'
const Login = () => {

  const [active, setActive] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
  
  
  useEffect(() => {
    if(user || isSuccess){
        navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const auth = (e) =>{
    e.preventDefault()
    dispatch(loginUser({username, password}))
  }


  return (
    <div className={(active ? 'login-page active' : 'login-page')}>
        <div className='container-login'>
            <div className="blueBg">
                <div className="box signin">
                    <h2>Sudah punya akun?</h2>
                    <button className='signinBtn' onClick={() => {setActive(false)}}>Sign in</button>
                </div>

                <div className="box signup">
                    <h2>Belum punya akun?</h2>
                    <button className='signupBtn' onClick={() => {setActive(true)}}>Sign up</button>
                </div>
            </div>
            <div className= {(active ? 'formBx active' : 'formBx')}>
                {isError && <div className="msg">{message}</div>}
                
                <div className="form signinForm">
                    <form onSubmit={auth}>
                        <h3>Sign in</h3>
                        <input type="text" id="username" placeholder='Username' value={username} onChange= {(e) => setUsername(e.target.value)} />
                        <input type="password" id="password" placeholder='Password' value={password} onChange= {(e) => setPassword(e.target.value)}/>
                        <button type="submit">{isLoading ? 'Loading' : 'Login'}</button>
                        <a href="#" className='forgot'>Lupa password?</a>
                    </form>
                </div>

                <div className="form signupForm">
                    <form>
                        <h3>Sign up</h3>
                        <input type="text" placeholder='Username'/>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Password'/>
                        <input type="password" placeholder='Confirm Password'/>
                        <input type="submit" value="Daftar"/>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login