import { createContext, useReducer, useContext, useEffect } from "react";
import { User } from "../Types";

type Action = { type: string; payload?: { user: User } }; // Adjust payload type as needed

interface State {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
}
interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: State = {
  user: null,
  isAuth: false,
  isLoading: true,
};

const URL = import.meta.env.VITE_FAKE_API + "/users";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload && action.payload.user)
      );
      return {
        ...state,
        user: action.payload ? action.payload.user : null,
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

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuth, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email: string, password: string) {
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
