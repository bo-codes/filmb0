// frontend/src/components/Navigation/index.js
import React from 'react';
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';


function Navigation({ isLoaded }){

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);


  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup" id="signUp">
          <button className="button">Sign Up</button>
        </NavLink>
        <LoginFormModal />
        <button onClick={handleDemo} className="button">Demo</button>
      </>
    );
  }

  return (
    <div className="navBar" style={{}}>
      <ul >
        <NavLink
          exact
          to="/"
          id="logo"
          style={{ padding: "10px", marginTop: "10px" }}
        >
          <>
            <img
              src="./favicon3.png"
              alt="icon"
              id="logoImg"
              style={{ height: "80px" }}
            ></img>
          </>
        </NavLink>
        <NavLink to="/images" className="buttonlink" style={{padding: '0px', marginRight: '14px', fontSize: '18px'}}>
          Images
        </NavLink>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  );
}

export default Navigation;
