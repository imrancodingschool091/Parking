import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleError = (msg) => toast.error(msg);
  const handleSucess = (msg) => toast.success(msg);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", formData);
      const { success, message, error } = response.data;

      if (success) {
        handleSucess("User registered successfully");
        localStorage.setItem("token", response.data.token);
        navigate('/loginPage');
      } else if (error) {
        const details = error?.details?.[0]?.message || "Something went wrong";
        handleError(details);
      } else if (message) {
        handleError(message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      handleError(errorMsg);
    }
  };

  return (
    <section id="login-form" className="how-it-works section-bg">
      <div className="container">
        <form onSubmit={handleSubmit} id="Login">
          <div className="left">
            <div>
              <p>Hello, Welcome!</p>
              <a href="#">Already have an account?</a>
              <button
                type="button"
                className="register_btn mt-2"
                onClick={() => navigate('/loginPage')}
              >
                Login
              </button>
            </div>
          </div>
          <div className="right">
            <div>
              <h1>Sign Up</h1>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="mt-4" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
