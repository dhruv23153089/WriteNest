import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import{login, logout} from "./store/authSlice"
import { Footer, Header, ChatBot } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}) )
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
  <div className='section-shell min-h-screen'>
    <div className='relative z-10 flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 pb-12 pt-6 md:pt-10'>
         <Outlet /> 
      </main>
      <Footer />
    </div>
    {/* AI ChatBot - Available to everyone */}
    <ChatBot />
  </div> 
  ) : null
}

export default App
