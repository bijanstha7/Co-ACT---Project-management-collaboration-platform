import { Link } from "react-router-dom";

const ShowUsernameComponent = () => {
  return (
    // <div className="showusernamecomponent">
    //   <p>
    //     Your username is "
    //     <username>
    //       {JSON.parse(localStorage.getItem("user")).displayName}
    //     </username>
    //     "!
    //   </p>
    //   <div className="linktomain">
    //     <Link to="/mainpage">
    //       <button>Back to mainpage</button>
    //     </Link>
    //   </div>
    // </div>
    <div className="frame">
  <div className="center">
    
		<div className="profile">
			<div className="image">
				<div className="circle-1">
				<div className="circle-2"><img src={JSON.parse(localStorage.getItem("user")).photos[0].value}  width="70" height="70" alt="Profile" /></div></div>
				
			</div>
			
			<div className="name">
        <username>
          {JSON.parse(localStorage.getItem("user")).displayName}  
          </username>
          </div>
			<div className="job">Student</div>
			
			<div className="actions">
				<button className="btn">Follow</button>
				<button className="btn">Message</button>
        <div className="linktomain">
      <Link to="/mainpage">
        <button>Home</button>
      </Link>
		</div>
			</div>
		</div>
		
		<div className="stats">
			<div className="box">
				<span className="value">523</span>
				<span className="parameter">Posts</span>
			</div>
			<div className="box">
				<span className="value">1387</span>
				<span className="parameter">Likes</span>
			</div>
			<div className="box">
				<span className="value">146</span>
				<span className="parameter">Follower</span>
			</div>
		</div>
  </div>
 
  
</div>


   
  );
};

export default ShowUsernameComponent;
