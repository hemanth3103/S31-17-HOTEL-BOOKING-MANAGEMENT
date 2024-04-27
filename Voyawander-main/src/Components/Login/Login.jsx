import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import Style from "../Login/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "../../Redux/auth/action";
import logo from "../../Images/logo_website.png";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
    secretKey: "", // New state for admin secret key
  });
  const [isError, setIsError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [userType, setUserType] = useState("User"); // Track user type (User/Admin)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth);
  console.log(isAuth);
  if (isAuth.isAuth) {
    navigate("/");
  }

  const handleSubmit = () => {
    if (!values.email || !values.pass) {
      setIsError("Please Fill All Fields");
      return;
    }

    setIsError("");
    setSubmitButton(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButton(false);
        console.log(res);
        navigate("/");
      })
      .catch((error) => setIsError(error.message), setSubmitButton(false));
    console.log(values);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("email", data.user.email);
        dispatch(setUserLogin(data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch user type from local storage or default to "User"
    setUserType(localStorage.getItem("userType") || "User");
    // Fetch user email from local storage
    setValues((prev) => ({ ...prev, email: localStorage.getItem("email") }));
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.inner}>
        <div>
          <img src={logo} className={Style.logo} />
          <h1 className={Style.welcome}>Welcome Back</h1>
        </div>
        <div>
          <input
            className={Style.input}
            type="email"
            placeholder="Enter Your Email"
            value={values.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <br />
        <div>
          <input
            className={Style.input}
            type="password"
            placeholder="Enter Your Password"
            value={values.pass}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, pass: e.target.value }))
            }
          />
        </div>
        {userType === "Admin" && ( // Show admin secret key input only if userType is Admin
          <div>
            <input
              className={Style.input}
              type="password"
              placeholder="Enter Admin Secret Key"
              value={values.secretKey}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, secretKey: e.target.value }))
              }
            />
          </div>
        )}
        <div>
          <p className={Style.dont}>{isError}</p>
        </div>
        <button
          className={Style.btn}
          onClick={handleSubmit}
          disabled={submitButton}>
          Login
        </button>
        <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ or ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
        <div className={Style.appLogo}>
          <img
            className={Style.images}
            onClick={handleGoogle}
            src="https://slackmojis.com/emojis/195-google/download"
          />
          <img
            className={Style.images}
            src="https://www.freeiconspng.com/thumbs/facebook-logo-png/facebook-logo-3.png"
          />
          <img
            className={Style.images}
            src="https://twemoji.twitter.com/content/dam/twemoji-twitter/Twitter_Social_Icon_Circle_Color.png.twimg.1920.png"
          />
        </div>
        <p className={Style.dont}>Don't have an account?</p>
        <button className={Style.btn} onClick={handleSignup}>
          Sign up
        </button>
        <p className={Style.dont}>Create an account to join us!</p>
        <button onClick={() => setUserType("Admin")}>Admin Login</button>
      </div>
    </div>
  );
};