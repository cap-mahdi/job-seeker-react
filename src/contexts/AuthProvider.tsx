import { createContext, useReducer, useContext, useEffect } from "react";
const AuthContext = createContext({});
const initialState = {
  user: null,
  isAuth: false,
  isLoading: true,
};

const URL = import.meta.env.VITE_FAKE_API + "/users";
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        isLoading: false,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

interface props {
  children: React.ReactNode;
}
function AuthProvider({ children }: props) {
  const [{ user, isAuth, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  async function login(email, password) {
    const res = await fetch(`${URL}?email=${email}&password=${password}`);
    const user = await res.json();
    if (user?.length) {
      dispatch({ type: "LOGIN", payload: { user: user[0] } });
    } else {
      throw new Error("Invalid email or password");
    }
  }
  async function logout() {
    dispatch({ type: "LOGOUT" });
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: { user: JSON.parse(user) } });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
