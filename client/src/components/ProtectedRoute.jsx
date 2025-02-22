import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const { loggedIn } = useSelector((store) => store.auth);
  return !loggedIn ? <Navigate to="/login" /> : element;
}

export default ProtectedRoute;
