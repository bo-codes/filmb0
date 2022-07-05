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
      <div style={{margin: '18px'}}>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup" className='buttonlink'>
          Sign Up
        </NavLink>
        <LoginFormModal />
        <button onClick={handleDemo} className="buttonlink">Demo</button>
      </>
    );
  }

  return (
    <div className="navBar" style={{marginBottom: '60px'}}>
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
        {/* <NavLink to="/images" className="buttonlink" >
          Images
        </NavLink> */}
        {isLoaded && sessionLinks}
      </ul>
    </div>
  );
}

export default Navigation;
