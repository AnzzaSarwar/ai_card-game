import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import card2 from '../../public/cardnav.png';
import card4 from '../../public/math3[1].png';
import card3 from '../../public/movie5[1].png';
import card1 from '../../public/thorin3[1].png';
import logo from '../../public/assets/icons/logos/mainlogo.svg';

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e: any) => {
        const {name , value} = e.target
        setFormData((prev)=>({
            ...prev ,
            [name]: value
        }))
    }

  const handleLogin = async (e: any) => {
    e.preventDefault()
  if (!formData.email || !formData.password) {
    alert("All fields are required");
    return;
  }

  const loginData = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await axios.post(
      'http://52.203.31.162:5001/api/auth/login',
      loginData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      alert('Login successful!');
      console.log('Token:', response.data.token);
      console.log('User Data:', response.data.data);

      // Optional: store token in localStorage or context
      localStorage.setItem('token', response.data.token);
      navigate('/')
      // Redirect or update UI
      // navigate('/dashboard'); (if using react-router)
    } else {
      alert(response.data.message || 'Login failed');
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        alert('Missing email or password');
      } else if (status === 401) {
        alert('Invalid credentials');
      } else {
        alert('Server error. Try again later.');
      }
    } else {
      console.error(error);
      alert('Something went wrong. Please check your connection.');
    }
  }
};

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
          <form className="form-bg" onSubmit={handleLogin}>
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">Log in to stay connected.</p>

            <label>Email</label>
            <input type="email" className="input" name='email' onChange={handleInput} />

            <label>Password</label>
            <input type="password" className="input" name='password' onChange={handleInput} />

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
              Don&apos;t have an account? <a href="sign-up">Click here to sign up.</a>
            </p>
          </form>
        </div>
      </div>
</div>
);
}