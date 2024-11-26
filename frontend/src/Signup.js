import React, { useState } from 'react';
import './App.css';
import loginimg from './gym.png'
import Login from './Login';


const Signup = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);  // Toggle between signup and login
  };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      // Check if formData is being captured
      console.log('Form Data:', formData);

      // Send data to backend
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Check the response and display the appropriate message
      if (result.success) {
        setMessage('Signup successful!');
      } else {
        setMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };


  return (
    <>
      <div style={{ "display": "flex","height":"100vh" }}>
        <div style={{ "display": "flex", "width": "100%" }}>
          <img src={loginimg} width="100%"></img>
        </div>
        <div style={{ "display": "flex", "width": "100%" }}>
          {isSignup ? (
            <>
              <div style={{"width":"100%", "mb" : "20%"}}>
                <Login />
                <div style={{"position":"absolute","bottom":"35px","display":"flex","alignItems":"center","justifyContent":"center","width":"50%"}}>
                  <p style={{"display":"flex","flexDirection":"column","justifySelf":"center","width":"100%","alignItems":"center","gap":"10px"}}>
                    Don't have an account?{' '}
                    <button onClick={toggleForm} style={{"width":"18%","padding":"10px 0px"}}>SignUp here</button>
                  </p>
                </div>
              </div>

            </>
          ) : (
            <div style={{ "width": "100%" }}>
              <div style={{ "display": "flex", "flex-direction": "column" }}>

                <form onSubmit={handleSubmit} style={{ "justifyContent": "center", "height": "100vh" }}>
                  <div style={{ "display": "flex", "flexDirection": "column", "gap": "25px", "justifyContent": "center", "alignItems": "center" }}>
                    <h1>Create New Account✌️</h1>
                    <p>Please enter details to Create a new account</p>
                  </div>
                  <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "marginTop": "10px" }}>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ "marginTop": "15px", "display": "flex", "flexDirection": "column", "gap": "10px", "alignItems": "center" }}>
                    <button type="submit" style={{ "width": "70%","boxShadow":"2px 2px 15px rgb(50, 173, 250) " }}>Sign Up</button>
                    {message && <p>{message}</p>}
                    <p>
                      Already have an account?{' '}

                    </p>
                    <button onClick={toggleForm} style={{"width":"18%","padding":"10px 0px"}}>Login here</button>
                  </div>
                </form>
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  )
}
export default Signup;
