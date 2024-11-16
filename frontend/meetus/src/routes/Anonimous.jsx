import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
import { LoaderSpinner } from "../components/ui/LoaderSpinner";

const Anonymous = () => {
  const {user, loading} = useAuth()
  
  if(loading) return (<LoaderSpinner size={60}/>);

  // const item = JSON.parse(localStorage.getItem('user'));
  // const token = item?.accessToken;

  return  user ?  <Navigate to="/dashboard" replace /> : <Outlet/>;
}

export default Anonymous