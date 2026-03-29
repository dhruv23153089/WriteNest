import React from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => { 
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/", { replace: true })
        })
    }              
    return (
        <button
        className='inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[var(--accent-deep)]'
        onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn
