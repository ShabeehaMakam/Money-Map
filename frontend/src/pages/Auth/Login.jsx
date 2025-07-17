import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to log in
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="text"
              autoComplete="email"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
              autoComplete="current-password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">LOGIN</button>

            <p className="text-[13px] text-slate-800 mt-3">
              Don’t have an account?{' '}
              <Link className="font-medium text-primary underline" to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
