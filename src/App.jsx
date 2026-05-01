import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import AdoptionLists from './AdoptionLists';

import { AppContext } from './AppContext';

import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { backendBaseUrl } from './env';

function App() {

  const [token, setToken] = useState("")
  const [isTokenCheckDone, setIsTokenCheckDone] = useState(false)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState("")
  const [lists, setLists] = useState([])

  const navigate = useNavigate()

  const fetchLists = () => {
    fetch(`${backendBaseUrl}/adoptionlists`)
      .then(res => {
        if (res.status === 200) {
          setError("")
          return res.json().then(data => {
            setLists(data)
          })
        }
        else {
          res.text().then((text) => {
            setError(text)
            console.log(error)
          })
        }
      })
  }

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (!t) {
      setIsTokenCheckDone(true)
      return
    }

    const token = jwtDecode(t)
    console.log(token)
    const promise2 = fetch(`${backendBaseUrl}/users/` + token.id, {
      headers: { "Authorization": t }
    })

    setToken(t.replace("Bearer ", ""))

    promise2.then(function (val) {
      val.json().then(function (a) {
        console.log(a)
        setProfile(a)
        setIsTokenCheckDone(true)
      })
    })
  }, [])

  function logOut() {
    localStorage.removeItem("token")
    setProfile(null)
    setToken("")
    return
  }

  const data = {
    jwtDecode,
    setProfile,
    profile,
    setToken,
    token,
    setError,
    error,
    fetchLists,
    lists,
    logOut,
    navigate
  }

  if (!isTokenCheckDone) {
    return <div className='bg-black'>Loading...</div>
  }

  return (
    <>
      <AppContext.Provider value={data}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/adoptionlists' element={<AdoptionLists />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
