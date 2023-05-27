import "./auth.css";
import avatar from "./profileimg.png";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../Redux/Auth/action";
export const LoginComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
    email: "albert@gmail.com",
    password: "albert",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = () => {
    const url = "https://messanger-br6c.onrender.com/auth/login";
    dispatch(authRegister(url, regData));
  };
  if (user._id) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Welcome back!</h2>

        <div className="details-cont">
          <p>Email</p>
          <input name="email" onChange={handleChange} className="inputcom" />

          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="inputcom"
          />

          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}

          <p className="auth-link" onClick={handleSubmit}>
            Don't have an account? Click continue to login as guest
          </p>
          <p className="contract">
            Need an account ?
            <Link className="auth-link" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
