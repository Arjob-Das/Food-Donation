import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaDonate } from "react-icons/fa";
import { BsCartPlusFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setNumber(parsedUser.number);
      setEmail(parsedUser.email);
    }
    setLoading(false); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    console.log("logout");
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setName(user.name);
    setNumber(user.number);
    setEmail(user.email);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put("http://localhost:3000/update", {
        id: user._id,
        name,
        number,
        email,
      });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data); // Update local state
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="wrapper">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="wrapper">
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="wrapper">
        <div className="profile">
          <div className="profile_img_info">
            <div className="img"></div>
            <div className="info">
              {!editing ? (
                <>
                  <p className="name">{name}</p>
                  <p className="place">
                    <button className="logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSaveChanges}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              )}
            </div>
          </div>
          <div className="profile_skills">
            <div className="skills">
              <p>User Info</p>
              {!editing ? (
                <ul>
                  <li>
                    <span className="icon">
                      <MdEmail />
                    </span>
                    <span className="title">{email}</span>
                  </li>
                  <li>
                    <span className="icon">
                      <BsFillTelephoneFill />
                    </span>
                    <span className="title">{number}</span>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className="tags_wrap">
              {!editing ? (
                <span className="tag" onClick={handleEditProfile}>
                  Edit Profile
                </span>
              ) : null}
              <span className="tag">Change Username</span>
              <span className="tag">Change Password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
