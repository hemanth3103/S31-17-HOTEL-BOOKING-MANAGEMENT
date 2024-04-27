import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Style from "../Signup/Signup.module.css";
import { useSelector } from "react-redux";
import logo from "../../Images/logo_website.png";

export const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [isError, setIsError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);

  const [secretKey, setSecretKey] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth);
  console.log(isAuth);
  if (isAuth.isAuth) {
    navigate("/");
  }

  const handlesubmit = () => {
    // Password validation regular expression
    const passwordRegex = /^(?=.[A-Z])(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;

    if (userType === "Admin" && secretKey !== "ABHIRAM") {
      alert("ADMIN error");
      return;
    }

    if (!values.name || !values.email || !values.pass) {
      setIsError("Please Fill All Fields");
      return;
    }

    if (!passwordRegex.test(values.pass)) {
      setIsError(
        "Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    setIsError("");
    setSubmitButton(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButton(false);
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        setIsError(error.message);
        setSubmitButton(false);
      });

    console.log(values);
  };

  return (
    <div className={Style.container}>
      <div className={Style.inner}>
        <div>
          <button>
            <div>
              Register AS
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              User
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              Admin
            </div>
          </button>

          <img src={logo} className={Style.logo} />
          <p className={Style.welcome}>
            Embark on a Journey Beyond Boundaries – Explore, Dream, and Discover
            with Us!
          </p>
        </div>
        {userType === "Admin" ? (
          <div>
            <input
              className={Style.input}
              type="text"
              placeholder="Enter your Secret key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        ) : null}

        <br />
        <div>
          <input
            className={Style.input}
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <br />
        <div>
          <input
            className={Style.input}
            type="email"
            placeholder="Enter Your Email"
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
            onChange={(e) =>
              setValues((prev) => ({ ...prev, pass: e.target.value }))
            }
          />
        </div>
        <br />
        <div>
          <p className={Style.dont}>{isError}</p>
        </div>
        <button
          className={Style.btn}
          onClick={handlesubmit}
          disabled={submitButton}
        >
          Sign up
        </button>

        <p>
          Already have an account?
          <span>
            <Link className={Style.link} to="/login">
              {" "}
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};