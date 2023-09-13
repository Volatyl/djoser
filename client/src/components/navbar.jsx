import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "./context";

const Navbar = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(ProjectContext);

  return (
    <div>
      <ul className="flex space-x-5 bg-zinc-200 p-4 mb-5 text-zinc-600 items-center">
        <li onClick={() => navigate("/")} className="cursor-pointer text-xl">
          Auth System
        </li>
        <li onClick={() => navigate("/")} className="cursor-pointer">
          Home
        </li>
        {state.isAuthenticated ? (
          <div className="flex space-x-5">
            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                dispatch({ type: "LOAD_USER_FAIL" });
              }}
            >
              Logout
            </li>
          </div>
        ) : (
          <div className="flex space-x-5">
            <li onClick={() => navigate("/login")} className="cursor-pointer">
              Login
            </li>
            <li onClick={() => navigate("/signup")} className="cursor-pointer">
              Register
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
