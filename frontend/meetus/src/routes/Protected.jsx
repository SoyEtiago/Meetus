import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoaderSpinner } from "../components/ui/LoaderSpinner";

const Protected = () => {
  const {user, loading} = useAuth()

  if(loading) return (<LoaderSpinner size={60}/>);

  console.log(user);
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default Protected