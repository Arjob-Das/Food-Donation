import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      number: formData.number,
    };

    try {
      const response = await axios.post("http://localhost:3000/signup", data);
      console.log(response);

      navigate("/login"); // redirect to login after successful signup
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_main-img"></div>

      <div className="signup_wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign-Up</h1>
          <p>Create your free account on Food-donation</p>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            id="name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            id="email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            id="password"
            required
          />
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            id="phone"
            required
          />

          <button type="submit" id="signup-btn">
            Sign Up
          </button>

          <div className="login">
            <p>Already have an account?</p>
            <Link to="/login">
              <button type="button" className="login-btn">Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
