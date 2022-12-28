import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function Protected(){
    const cookies = new Cookies();
    let token = cookies.get("jwt");
    if (token === undefined) {
      token = "";
    }
return(
    <>{token.length ? <Outlet/> : <Navigate to="/signin" />}</>
)  
}