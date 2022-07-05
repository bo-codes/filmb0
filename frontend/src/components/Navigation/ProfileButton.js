// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

import '../../index.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu} className="buttonlink" style={{fontSize: '16px'}}>
        <i >USER</i>
      </button>
      {showMenu && (
        <div className="dropdown-content">
          <ul className="profile-dropdown" style={{ color: "white" }}>
            <li style={{ marginTop: "18px" }}> Welcome, {user.username}</li>
            <li style={{ marginTop: "5px" }}>{user.email}</li>
            <ul>
              <button onClick={logout} style={{ marginTop: '18px'}}>
                logout
              </button>
            </ul>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
