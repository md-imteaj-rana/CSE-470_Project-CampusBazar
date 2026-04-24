import React, { useContext } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider'
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Regisger = () => {

  const {registerWithEmailPassword, setUser, user} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const imageurl = e.target.imageurl.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;           
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if(pass.length < 6){
      return alert("Password length can not be less than 6!!!")
    }
    if(!uppercase.test(pass)){
      return alert("You must use uppercase letters in your password.")
    }
    if(!lowercase.test(pass)){
      return alert("You must use lowercase letters in your password.")
    }
    if (!number.test(pass)) {
      return alert("You must include at least one number.");
    }
    if (!specialChar.test(pass)) {
      return alert("You must include at least one special character.");
    }

    registerWithEmailPassword(email, pass)
    .then((userCredential) => {
    // Signed up 
    //const user = userCredential.user;
    updateProfile(auth.currentUser, {
    displayName: name, photoURL: imageurl
    }).then(() => {
      //console.log(userCredential.user)
      setUser(userCredential.user)
      // Profile updated!
      // ...
    }).catch((error) => {
      console.log(error)
      // An error occurred
      // ...
    });

    })
    .catch(err => {
      console.log(err);
    })


  }

  return (
    <div>
      <title>Sign up to CampusBazar</title>
      <div className="min-h-screen bg-linear-to-r from-purple-200 via-pink-200 to-yellow-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 md:p-12 transition-transform transform hover:scale-105 duration-500">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome to CampusBazar!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-gray-700 font-semibold">Name</label>
            <input name='name' type="text" placeholder="Enter your name" required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"/>
          </div>
          <div>
            <label className="label text-gray-700 font-semibold">Image URL</label>
            <input name='imageurl' type="text" placeholder="Image URL"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"/>
          </div>
          <div>
            <label className="label text-gray-700 font-semibold">Email</label>
            <input name='email' type="email" placeholder="Email" required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"/>
          </div>
          <div>
            <label className="label text-gray-700 font-semibold">Password</label>
            <input name='password' type="password" placeholder="Password" required
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"/>
          </div>
          <div className="text-right">
            <Link to={'/Login'} className="text-blue-600 hover:underline text-sm md:text-base">Already have an account? Login now.</Link>
          </div>
          <button className="btn w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl mt-4 shadow-lg transition-transform transform hover:scale-105">
            Sign Up
          </button>
          
        </form>
      </div>
    </div>
    </div>
  )
}

export default Regisger
