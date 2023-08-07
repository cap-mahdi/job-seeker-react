import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
interface props {
  children: React.ReactNode;
}
function ProtectedPage({ children }: props) {
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) return;
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate, isLoading]);
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </div>
    );
  return isAuth ? children : null;
}

export default ProtectedPage;
