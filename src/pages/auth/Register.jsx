import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";

export default function Register() {
  const [email, setEmail] = useState("");

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
        />

        <button type="submit" className="btn btn-raised">
          Register
        </button>
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