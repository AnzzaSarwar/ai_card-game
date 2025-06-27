import axios from 'axios'
import { redirect } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import card2 from '../../public/cardnav.png';
import card4 from '../../public/math3[1].png';
import card3 from '../../public/movie5[1].png';
import card1 from '../../public/thorin3[1].png';
import logo from '../../public/assets/icons/logos/mainlogo.svg';
// http://52.203.31.162:5001/api/


export default function Signuppage() {

    const [formData, setFormData] = useState({
      username: '' , email: '', password: '' 
    })

    const handleInput = (e: any) => {
        const {name , value} = e.target
        setFormData((prev)=>({
            ...prev ,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      // if(!formData.username || !formData.email || !formData.password) {
      //   alert('All Fields are required')
      //  }

      //  const formDataToSend = new FormData()

      //  formDataToSend.append('name' , formData.username)
      //  formDataToSend.append('email' , formData.email)
      //  formDataToSend.append('password' , formData.password)

      const dataToSend = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

       try {
        const response = await axios.post('http://52.203.31.162:5001/api/auth/register', dataToSend, {
          headers: {
          'Content-Type': 'application/json',
          }
        })
         if (!response.data.success) {
      alert(response.data.message);
    } else {
      alert('User registered successfully!');
      redirect('/dashboard')
      console.log('JWT:', response.data.token);
      console.log('User Data:', response.data.data);
    }
       } catch (error) {
        console.log(error);
        
       }
    }





  return (
    <div className="signin-container">
      {/* Background Cards */}
      <img src={card1} alt="Card 1" className="card1" />
      <img src={card2} alt="Card 2" className="card2" />
      <img src={card3} alt="Card 3" className="card3" />
      <img src={card4} alt="Card 4" className="card4" />

      {/* Left and Right Side */}
      <div className="signin-content">
        {/* Left Side */}
        <div className="signin-left">
          <img src={logo} alt="Logo" className="signin-logo" />
          <h1 className="signin-heading">
      <span>Design Your <strong>Card Game</strong></span>
    </h1>
          <p className="signin-subheading">
            Design Your Cards Game: Craft Mechanics<br /> With <strong>AI</strong> to bring it to Life.
          </p>
        </div>

        {/* Right Side */}
        <div className="signin-right">
          <form className="form-bg" onSubmit={handleSubmit}>
            <h2 className="form-title">Create an Account</h2>
            <p className="form-subtitle">Sign up to stay connected.</p>

            <label>Name</label>
            <input onChange={handleInput} type="text" className="input" name='username' />
            <label>Phone</label>
            <input onChange={handleInput} type="text" className="input" name='phone' />
            <label>Email</label>
            <input onChange={handleInput} type="email" className="input" name='email' />
            <label>Address</label>
            <input onChange={handleInput} type="text" className="input" name='address' />

            <label>Password</label>
            <input onChange={handleInput} type="password" className="input" name='password' />

            <div className="form-row">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Remember me?</label>
              </div>
              <p className="forgot">Forgot Password</p>
            </div>

            <button type="submit" className="signin-btn">Sign in</button>
            <button type="submit" className="signin-btn">Sign in with Google</button>
            {/* <p className="alt-signin">or sign in with other accounts?</p> */}

            {/* <div className="social-icons">
              <img src={google} alt="Google" />
              <img src={facebook} alt="Facebook" />
            </div> */}

            <p className="signup-link">
              Already have an account? <a href="/login">Click here to Login.</a>
            </p>
          </form>
        </div>
      </div>
</div>
);
}