import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.tsx";
import { useEffect } from "react";
import { useRouterPush } from "../hooks/use-router-push.tsx";
import useToastify from "../hooks/use-toastify.tsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const { push } = useRouterPush();
  const navigate = useNavigate();
  const { toastError } = useToastify();

  useEffect(() => {
    if (!isAuthenticated) {
      push({ query: { login: true } });
      navigate("/");
      toastError("You need to login");
    }
  }, [isAuthenticated, navigate, push, toastError]);

  return <Outlet />;
};

export default ProtectedRoute;
