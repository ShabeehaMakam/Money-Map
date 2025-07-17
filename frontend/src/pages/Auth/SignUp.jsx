/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance'; // Uncomment if backend call is added
 import { API_PATHS } from '../../utils/apiPaths';     // Uncomment if using API paths

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Example backend call (uncomment and adapt if needed)
      /*
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profilePic, // if using file upload, handle properly
      });
      */

      console.log("Sign up successful!");
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Create an Account</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Name"
              type="text"
              autoComplete="name"
            />
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
              placeholder="Min 6 Characters"
              type="password"
              autoComplete="new-password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">SIGN UP</button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account?{' '}
              <Link className="font-medium text-primary underline" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
