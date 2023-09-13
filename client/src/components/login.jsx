import React, { useContext, useState } from "react";
import { API_URL } from "./url";
import { ProjectContext } from "./context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { state, dispatch } = useContext(ProjectContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function login_user() {
    fetch(`${API_URL}/auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            const errorMessage = errorData.detail || "An error occurred";

            throw new Error(
              `Request failed with status ${res.status}: ${errorMessage}`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "LOAD_USER", payload: data.user });
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "LOAD_USER_FAIL" });
      });
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    fetch(`${API_URL}/auth/jwt/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            const errorMessage = errorData.detail || "An error occurred";

            throw new Error(
              `Request failed with status ${res.status}: ${errorMessage}`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        login_user();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "LOAD_USER_FAIL" });
      });
  };

  return state.isAuthenticated ? (
    null
  ) : (
    <>
      <div className="pl-5 space-y-5">
        <p>Sign into your Account</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="border-2 mr-2 mb-2 p-2 inline-block">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="border-2 mb-2 mr-2 p-2 inline-block outline-none">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 p-2 text-white block"
            type="submit"
          >
            Login
          </button>
        </form>
        {/* <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
          Continue With Google
        </button>
        <br />
        <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
          Continue With Facebook
        </button> */}
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500 hover:text-blue-400">Sign Up</span>{" "}
          </Link>
        </p>
        <p className="mt-3">
          Forgot your Password?{" "}
          <Link to="/reset-password">
            <span className="text-blue-500 hover:text-blue-400">
              Reset Password
            </span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
