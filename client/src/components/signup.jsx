import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./url";
import { ProjectContext } from "./context";

const Signup = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });

  const { email, first_name, last_name, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(formData);
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        re_password: re_password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            console.log(errorData);
            const errorMessage = errorData.email;

            throw new Error(
              `Request failed with status ${res.status}: ${errorMessage}`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        navigate("/login");
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "LOAD_USER_FAIL" });
      });
  };

  return (
    <div className="pl-5 space-y-5">
      <p>Sign up for an Account</p>
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
        <div className="border-2 mr-2 mb-2 p-2 inline-block">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="border-2 mr-2 mb-2 p-2 inline-block">
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
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
        <div className="border-2 mb-2 mr-2 p-2 inline-block outline-none">
          <input
            type="password"
            placeholder="Re-Password"
            name="re_password"
            value={re_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 p-2 text-white block"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
