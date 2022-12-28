import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);
  const handleLogout = () => {
    setCookie("jwt", "");
    console.log(cookies)
    navigate("/signin");
  };
  return (
    <>
      <button id="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
export default Logout;