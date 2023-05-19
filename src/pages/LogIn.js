import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";

export default function LogIn() {
  const [input, setInput] = useState({
    username: null,
    password: null,
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const logInData = await login(input);
      Cookies.set("access_token", logInData.res, { expires: 7 });
      navigate("/testimonials");
    } catch (error) {
      console.log(error);
      setError(error.response);
    }
  };
  return (
    <div className="bg-info login">
      <h1 className="text-center pt-5">Log In</h1>
      <form className="w-50 m-auto pt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="username"
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handelChange}
          />
        </div>
        {error && <p className="text-danger fw-bold fs-5">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handelSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
