import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { thunkGetAllImages } from "../../store/images";
import CreateImageModal from "../ImageFormModal";
import ImageForm from "../ImageFormModal/ImageForm";

import "./images.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllImages());
  }, [dispatch]);

  const imagesList = useSelector((state) => Object.values(state.images));
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div style={{ display: "block", marginLeft: "50%", marginRight: "50%", background: 'grey',  fontSize: '88px',}}>
      <NavLink
        exact
        to="/images"
        style={{ textDecoration: "none", color: "white", marginLeft: '50%', marginRight: '50%', padding: '30px', background: 'grey', }}
      >
        <h3 style={{paddingBottom: '20px'}}>experiences</h3>
      </NavLink>
    </div>
  );
}
