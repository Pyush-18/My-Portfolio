import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../Api/Api.js";
axios.defaults.withCredentials = true

function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={registerHandler}
        className="flex flex-col justify-center items-center gap-3 w-[80vw] lg:w-[20vw] mx-auto"
      >
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="px-3 py-2 rounded-md bg-transparent border-2 text-white w-full"
        />
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-3 py-2 rounded-md bg-transparent border-2 text-white w-full"
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="px-3 py-2 rounded-md bg-transparent border-2 text-white w-full"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded-md bg-transparent border-2 text-white w-full hover:bg-white hover:bg-opacity-20"
        >
          Sign Up
        </button>
        <div className="text-white mt-4">
          <p>
            Already have an account ?{" "}
            <Link className="text-blue-600 hover:underline" to="/login">
              Login
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default AdminSignup;
