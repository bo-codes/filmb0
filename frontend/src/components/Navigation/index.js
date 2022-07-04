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
    <div className="navBar">
      <ul className="navBar">
        <NavLink exact to="/" id="logo">
          <>
            <img
              src="/Users/eli/Pictures/Lightroom Saved Photos/for sale/filmb0--/frontend/public/film.png"
              id="logoImg"
            ></img>
            <label id="logoTitle">b0film</label>
          </>
        </NavLink>
        {isLoaded && sessionLinks}
        <NavLink to="/images" id="beachesLink">
          Images
        </NavLink>
      </ul>
    </div>
  );
}

export default Navigation;
