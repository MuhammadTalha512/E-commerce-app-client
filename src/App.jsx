import React from 'react'
import { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './App.scss'
import Routes from './pages/Routes'
import { useAuthContext } from './contexts/AuthContext'
import ScreenLoader from './components/ScreenLoader'
import Aos from 'aos'
import { useLocation } from 'react-router-dom'

function App() {
const {isAppLoading, setContextState} = useAuthContext()

useEffect(()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token")

  if(token){
    localStorage.setItem("token", token)
    setContextState((s)=>({...s, isAuth: true}))
    window.history.replaceState({}, "", "/")
    window.location.reload()
  }
},[])
useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname])

  return (
    <>
    {
      isAppLoading
      ?<ScreenLoader />
      :<Routes />
    }
    </>
  )
}

export default App
