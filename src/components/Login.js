import React from "react";

const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  return (
    <div className="googlelogin">
      <button  onClick={google}>
        <img className="google-logo" src="/images/Google.png" alt="googlelogo" />
        <p>Sign In</p>
      </button>
    </div>
  );
};

export default Login;
