import React, { useContext } from "react";
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import "./topbar.css";
import { Search, Person, Chat, Notifications } from '@material-ui/icons'

function Topbar() {

  const { user } = useContext(AuthContext)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className="logo">Heroclub</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>


        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to='/messenger'>
              <Chat style={{ color: "white" }} />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img src={user?.profilePicture} alt="" className="topbarImg" />
        </Link>
      </div>

    </div>);
}

export default Topbar;
