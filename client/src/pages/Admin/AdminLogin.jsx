import { useState } from "react";
import { USER_API_ENDPOINT } from "../../Api/Api.js";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import axios from "axios";
import { login, setAuthUser } from "../../redux/slices/authSlice.js";
axios.defaults.withCredentials = true

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {withCredentials: true}
    );
    if(response?.data?.success){
      dispatch(login())
      dispatch(setAuthUser(response?.data?.user))
      toast.success(response?.data?.message)
      navigate("/admin")
    }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={loginHandler}
        className="flex flex-col justify-center items-center gap-3 w-[80vw] lg:w-[20vw] mx-auto"
      >
        <input
          type="email"
          name="email"
          id="email"
          autoComplete='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-3 py-2 rounded-md bg-transparent border-2 text-white w-full"
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="px-3 py-2 rounded-md bg-transparent border-2 text-white w-full"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded-md bg-transparent border-2 text-white w-full hover:bg-white hover:bg-opacity-20"
        >
          Login
        </button>
      <div className="text-white mt-4">
      <p>Don't have an account ? <Link className="text-blue-600 hover:underline" to="/register">Signup</Link> </p>
      </div>
      </form>
    </div>
  );
}

export default AdminLogin;
