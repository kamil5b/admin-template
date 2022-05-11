import React, {useState,useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import Cookies from 'js-cookie';

const TheLayout = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    let cookie = Cookies.get().jwt
    fetch('http://localhost:8000/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              cookie
            })
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(err => console.log(err));
    
  }, [])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar user={user}/>
      <div className="c-wrapper">
        <TheHeader user={user}/>
        <div className="c-body">
          <TheContent user={user}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
