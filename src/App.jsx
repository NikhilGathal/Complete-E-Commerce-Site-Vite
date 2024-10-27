import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

import './App.css'

export default function App() {
  const [issign, setissign] = useState(false)
  // const [dark ,isdark] = useState(false)
  const[userlogin,setuserlogin] = useState(true)
  const [dark, isdark] = useState(JSON.parse(localStorage.getItem('isdarkmode')))
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  
    return () => {
      document.body.classList.remove('dark');
    };
  }, [dark]);
 
 
  return (
    <>
     
      <div className={`app-container ${dark ? 'dark' : ''}`}>
      <Header issign={issign} setissign={setissign} dark={dark} isdark={isdark}  setuserlogin={setuserlogin}/>
      <Outlet  context={[setissign,dark, isdark,issign,userlogin] }/>
    </div>
     
    </>
  )
}
