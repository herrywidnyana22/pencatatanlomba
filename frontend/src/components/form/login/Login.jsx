import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser, reset } from "../../../features/authSlice"

const Login = () => {
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    const dispatch = useDispatch()
    const goto = useNavigate()
    const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

    useEffect(() =>{
        if (user || isSuccess){
            goto("/dashboard")
            console.log("sukses")
        } else {
            console.log(user)
        }
        dispatch(reset())
    },[user, isSuccess, dispatch, goto])

    const Auth = (e) => {
        e.preventDefault()
        dispatch(loginUser({username, pass}))
    }

    

  return (
    <div>
        <form onSubmit={Auth}>
            {isError && <p className="text-center">{message}</p>}
            <div>
                <label htmlFor="username"></label>
                <input type="text" id='username' className='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Email' />
            </div>
            <div>
                <label htmlFor="pass"></label>
                <input type="password" id='pass' value={pass} onChange={(e)=>setPass(e.target.value)} className='pass' placeholder='Password' />
            </div>
            <button type="submit">{isLoading? 'Loading..' : 'Login'}</button>
        </form>
    </div>
  )
}

export default Login