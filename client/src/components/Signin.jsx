import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";
import axios from "axios";
import '../App.css'
export default function Signin() {
    const [loginDetails, setLoginDetails] = useState({});
    const [dataSent, setDataSent] = useState(false);
    const [cookies, setCookie] = useCookies([]);
    let navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      setLoginDetails({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
      });
      setDataSent(true);
    };
  
    useEffect(() => {
      const cookies = new Cookies();
      console.log(cookies.get("jwt"));
  
      const userLogin = () => {
        axios({
          method: "post",
          url:  "https://blog-test-server.onrender.com/signin" ,
          data: loginDetails,
        })
          .then((response) => {
            console.log(response.data);
            let token = response.data.authToken;
            console.log(token);
            setCookie("jwt", token, {
              path: "/",
              expires: new Date(Date.now() + 900000),
            });
            navigate("/")
          })
          .catch((err) => {
            console.log(err);
            alert("User doesn't exists!");
          }).finally(()=> {});
      };
  
      if (dataSent) {
        userLogin();
        setDataSent(false);
      }
  
    }, [loginDetails, dataSent, navigate, cookies, setCookie]);

    return (
        <div className="L-container">
            <div className="L-formDiv">
                <p>Login</p>
                <form action="/signin" method="POST" onSubmit={handleLogin}>
                    <input
                        id="L-userid"
                        type="email"
                        required={true}
                        name="email"
                        placeholder="USER Email"
                    />
                    <input
                        id="L-password"
                        name="password"
                        required={true}
                        type="password"
                        placeholder="PASSWORD"
                    />
                    <button type="submit" id="L-signin">
                        Sign In
                    </button>
                </form>
                <h3 id="L-afterForm">
                    New User?
                    <Link className="signup" to="/signup">
                        Signup
                    </Link>
                </h3>
            </div>
        </div>
    )
}