import React from "react";
import img1 from "../images/Untitled.png";

const CoactorsSection = () => {
  const displayCoactors = () => {
    const coactors = JSON.parse(
      localStorage.getItem("recent_cospace_clicked_coactors")
    );
    return coactors.map((coactor, index) => (
            <div className="friend-card" key={index} >
                <img src={img1} alt="profile-cover" className="img-responsive cover"  />
                <div className="card-info">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg" />
                <div className="friend-info">
                  <h5><p  className="profile-link">{coactor.text}</p></h5>
                </div>
              </div>
            </div>
              ));
  };

  return (
    <div className="coactorssection">
      <h1>Co-Actors</h1>
      
      <div className="friend-list">
        {displayCoactors()}</div>
    </div>
  );
};

export default CoactorsSection;
