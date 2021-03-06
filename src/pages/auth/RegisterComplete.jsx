import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";


export default function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove users email from localstorage
        localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser; // currently logged user
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult(); // currently logged in users token
        // redux store

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placholder="Enter your password"
        autoFocus
      />

      <br />

      <button type="submit" className="btn btn-raised">
        Complete
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
}
