import { useEffect} from "react";
import { useReducer } from "react";
import { createContext } from "react";
import api from "./Components/Api Config";

export const AuthContext = createContext();

const initialValue = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);


  function login(activeUser) {
    dispatch({
      type: "LOGIN",
      payload: activeUser,
    });
  }

  function logout() {
    localStorage.removeItem("Token");
    dispatch({
      type: "LOGOUT",
    });
  }

  useEffect(() => {
    const getCurrentUserData = async () => {

      const token = JSON.parse(localStorage.getItem("Token"));
      if (token) {
        try {
          const response = await api.post("/current-user", { token });
          if (response.data.success) {
            dispatch({
              type: "LOGIN",
              payload: response.data.user,
            });
          } else {
            dispatch({
              type: "LOGOUT",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCurrentUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;