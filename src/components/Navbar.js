import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const pictureUrl = JSON.parse(localStorage.getItem("user")).photos[0].value;

  const logout = () => {
    localStorage.clear();
    window.open("http://localhost:8000/auth/logout", "_self");
  };
  
  return (
    <nav>
      <div className="logo">
        <p className="Head" style={{fontSize: "44px" }}>Co-ACT</p>
      </div>
      <div className="notificationandprofile">
       
        <Link to="/showusernamepage">
          <button>
            <img
              src={pictureUrl}
              alt="avatar"
              style={{borderRadius: "50%",width: "50px",
              height: "50px",
              margin: "5px"}}
            />
          </button>
        </Link>
        <button onClick={logout}>
          <img src="images/Sign Out.png" />
        </button>
      </div>
    </nav>

    
  );

};


export default Navbar;
