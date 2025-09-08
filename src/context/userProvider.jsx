import { useState } from 'react'
import { userContext } from './userContext'
import axios from 'axios'

export default function UserProvider({children}) {
    const userFormStorage = sessionStorage.getItem('user')
    const [user, setUser] = useState(userFormStorage ? JSON.parse(userFormStorage) : {email: '', password: '' })

const signUp = async () => { 
    const headers = {headers: {'Content-Type': 'application'}}
    await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, JSON.stringify({user: user}), headers)
    setUser({email: '', password: ''})
}

const signIn = async (email, password) => { 
    const headers = {headers: {'Content-Type': 'application/json'}}
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, JSON.stringify({user: user}), 
headers)
    setUser(response.data)
    sessionStorage.setItem('user', JSON.stringify(response.data))
}

return (
    <userContext.Provider value= {{user,setUser,signUp, signIn}}>
        {children}
    </userContext.Provider>
)
}