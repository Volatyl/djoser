import { useState } from "react";
import { API_URL } from "./url";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/auth/users/reset_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
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
      <div className="pl-5 space-y-5">
        <p>Reset password</p>
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
          <button
            className="bg-red-600 hover:bg-red-700 p-2 text-white block"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
