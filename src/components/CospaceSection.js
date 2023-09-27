import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Component } from "react";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

class CospaceSection extends Component {
  state = { posts: [] };
  componentDidMount = () => {
    this.getCospaces();
    if (localStorage.getItem("cospace_created") === "1") {
      NotificationManager.success("Co-Space Created Successfully!");
      localStorage.setItem("cospace_created", "0");
    }
  };
  getCospaces = () => {
    const uid = JSON.parse(localStorage.getItem("user")).id;

    axios
      .get("http://localhost:8000/cospace/")
      .then((response) => {
        let data = [];
        response.data.map((post, index) => {
          if (post.uid === uid) {
            data.push(post);
          } else {
            post.coactors.map((obj, index) => {
              if (obj.id === uid) {
                data.push(post);
              }
            });
          }
        });

        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  setCurrentCospace = (e) => {
    localStorage.setItem("recent_cospace_clicked", e.currentTarget.id);
    this.state.posts.map((post) => {
      if (post.cospacename === e.currentTarget.id) {
        localStorage.setItem(
          "recent_cospace_clicked_description",
          post.description
        );
        localStorage.setItem(
          "recent_cospace_clicked_coactors",
          JSON.stringify(post.coactors)
        );
        localStorage.setItem("recent_cospace_clicked_uid", post.uid);
      }
    });
    window.location.href = "http://localhost:3000/taskpage";
  };

  displayCospace = (posts) => {
    return posts.map((post, index) => (

      <div
        key={index}
        className="cospace-courses_item"
        id={post.cospacename}
        onClick={this.setCurrentCospace}
      >
        <a href="#" class="cospace-courses-item_link">
        <div class="cospace-courses-item_bg"></div>
      <div class="cospace-courses-item_title">{post.cospacename}</div>
      <div class="cospace-courses-item_desc-box">
          About : 
          <span class="cospace-courses-item_desc" style={{ marginLeft: '.5rem' }}>
            {post.description}
          </span>
        </div>

        </a>
      </div>      
     
    ));
  };

  render() {
    return (
      <div className="cospacesection">
        <NotificationContainer/>
        <div className="mainpageheading">
          <center><h1 className="sub" style={{fontSize: "35px" }}>Co-SPACES</h1></center>
        </div>
        <div className="cospace-format-container">
        <div className="cospace-courses_box">
          {this.displayCospace(this.state.posts)}
        </div>
        </div>
        <Link to="/createcospace">
          <button className="createcospacebutton">
            <img src="/images/Add User Group Man Man.png" />
            <p>Create</p>
          </button>
        </Link>
      </div>
    );
  }
}

export default CospaceSection;
