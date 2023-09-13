import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./url";

const ConfirmPasswordReset = () => {
  const navigate = useNavigate();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const currentUrl = window.location.href;

  const urlParts = currentUrl.split("/");

  const uid = urlParts[urlParts.length - 2];
  const token = urlParts[urlParts.length - 1];

  const data = {
    uid: uid,
    token: token,
    new_password: new_password,
    re_new_password: re_new_password,
  };


    const onSubmit = (e) => {
      e.preventDefault();

      fetch(`${API_URL}/auth/users/reset_password_confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
          setRequestSent(true);
          return res.json();
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return requestSent ? (
    navigate("/")
  ) : (
    <>
      <div className="m-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="border-2 mb-2 mr-2 p-2 inline-block outline-none">
            <input
              className="form-control"
              type="password"
              placeholder="New Password"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="border-2 mb-2 mr-2 p-2 inline-block outline-none">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm New Password"
              name="re_new_password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 p-2 text-white block"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ConfirmPasswordReset;
