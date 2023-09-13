import { createContext, useEffect, useReducer } from "react";
import { API_URL } from "./url";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOAD_USER_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
      };
    default:
      return state;
  }
}

const ProjectContext = createContext(initialState);

function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`${API_URL}/auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + state.access,
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
        dispatch({ type: "LOAD_USER", payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "LOAD_USER_FAIL" });
      });
  }, []);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectContext, ProjectProvider };
