import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./url";

const Activate = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  const urlParts = currentUrl.split("/");

  const uid = urlParts[urlParts.length - 2];
  const token = urlParts[urlParts.length - 1];

  const handleVerify = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/auth/users/activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, token: token }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            console.log(errorData)
            const errorMessage = errorData.detail || "An error occurred";

            throw new Error(
              `Request failed with status ${res.status}: ${errorMessage}`
            );
          });
        }
        navigate("/login");
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleVerify} className="m-4 bg-zinc-200 p-2 text-zinc-700 rounded-md">Verify your account.</button>
    </div>
  );
};

export default Activate;
