import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { Button } from "antd";
import { useSelector } from "react-redux";

export default function Register({ history }) {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(`Email is sent to ${email}. Click to complete registration`);

    // save user email in local storage to use it (so we dont write it by ourself again)
    localStorage.setItem("emailForRegistration", email);

    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter your email address"
        />

        <br />
        <Button type="primary" className="btn btn-raised" block shape="round">
          Register
        </Button>
      </form>
    </>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}
