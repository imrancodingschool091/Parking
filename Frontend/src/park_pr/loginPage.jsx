import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleError = (msg) => toast.error(msg);
  const handleSuccess = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return handleError("Both fields are required");
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });

      handleSuccess("Login successful");

      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      handleError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login-form" className="login-section">
      <div className="container">
        <form onSubmit={handleSubmit} id="Login">
          <div className="left">
            <div>
              <p>Hello, Welcome!</p>
              <a href="#">Don't have an account?</a>
              <button
                type="button"
                className="register_btn mt-2"
                onClick={() => navigate('/Signup')}
              >
                Register
              </button>
            </div>
          </div>

          <div className="right">
            <div>
              <h1>Login</h1>
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
              <a href="/forgot-password">Forgot Password?</a>
              <button className="mt-4" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
