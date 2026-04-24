import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react'
import { Link } from 'react-router'
import auth from '../firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

  const {setUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user)  
    // ...
    })
    .catch((error) => {
      console.log(error)
    });

  }

  return (
    <div className=' items-center justify-center flex py-8'>
      <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <a href='' className='text-red-500 underline'>Forget password</a>
      <Link to={'/Register'} className="text-blue-700 hover:underline text-sm md:text-base">
              New at CampusBazar? Register now.
            </Link>
      <button className="btn btn-neutral mt-4">Login</button>
    </form>
    </div>
  )
}

export default Login
