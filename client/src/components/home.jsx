import React, { useContext } from "react";
import { ProjectContext } from "./context";
import { Link } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(ProjectContext);
  return (
    <div className="container flex justify-center w-full ">
      <div className="bg-zinc-100 p-4 space-y-4">
        <h1 className="text-4xl ">Welcome to Auth System!</h1>
        <p className="text-zinc-600">
          This is an incredible authentication system with production level
          features!
        </p>
        <hr className="my-4" />
        <p className="text-zinc-600">Click the Log In button</p>
        {state.isAuthenticated ? (
          <div className="flex space-x-5">
            <li
              className="bg-blue-500 p-2 text-white rounded-md mt-4 inline-block cursor-pointer"
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
            <Link
              className="bg-blue-500 p-2 text-white rounded-md mt-4 inline-block"
              to="/login"
              role="button"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
