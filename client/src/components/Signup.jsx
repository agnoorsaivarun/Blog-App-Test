import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const [signupDetails, setSignupDetails] = useState({});
    const [dataSent, setDataSent] = useState(false);
    let navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.cpassword.value;

        if (password === confirmPassword) {
            console.log("matching");
            setSignupDetails({
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
                cpassword: e.target.elements.cpassword.value,
            });
            setDataSent(true);
        } else {
            alert("Passwords are not matching");
        }
    }
    useEffect(()=>{
        const userSignup = () => {
            axios({
              method: "post",
              url: "https://blog-test-server.onrender.com/signup",
              data: signupDetails,
            })
              .then((response) => {
                alert("User created successfully!");
                navigate("/signin");
              })
              .catch((err) => {
                alert("User already exists!");
              });
          };
          if (dataSent) {
            userSignup();
            setDataSent(false);
          }
    },[signupDetails, dataSent, navigate])
    return (
        <div className="S-container">
            <div className="S-formDiv">
                <p>Sign Up</p>
                <form action="/signup" method="POST" onSubmit={handleSignup}>
                    <input
                        id="S-userid"
                        type="email"
                        required={true}
                        name="email"
                        placeholder="MAIL ID"
                    />
                    <input
                        id="S-password"
                        name="password"
                        required={true}
                        type="password"
                        placeholder="PASSWORD"
                    />
                    <input
                        id="S-cpassword"
                        name="cpassword"
                        required={true}
                        type="password"
                        placeholder="CONFIRM PASSWORD"
                    />
                    <button type="submit" id="S-signin">
                        Sign Up
                    </button>
                </form>
                <h2 id="S-afterForm">
                    <Link className="S-signup" to="/signin">
                        Sign in
                    </Link>
                </h2>
            </div>
        </div>
    )
}