import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser.js'

export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({authenticationMode}){
  const { user, setUser, signUp, signIn } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const signFunction = authenticationMode === AuthenticationMode.SignUp ?
    signUp : signIn

    signFunction().then(response =>{
      navigate(authenticationMode === Authentication.SignUp ? '/signin' : '/')
    })
    .catch(error => {
      alert (error)
    })
  }

  return (
    <div id='signin'>
      <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign in' : 'Sign up'} </h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input id='email' placeholder='Email' 
        value={user.email} 
        onChange={e => setUser({...user, email: e.target.value})}
        />
        <br></br>
        <label>Password</label>
        <input id='password' placeholder='Password' 
        type= 'password' value={user.password}
        onChange={e => setUser({...user, password: e.target.value})}
        />
        <button type='submit' id='submit'>{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}</button>
        <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' : '/signin'}>
        <br></br>
        {authenticationMode === AuthenticationMode.SignIn ? 'No account? Sign up' : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  )
}