import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    <div className="background" style={{ overflow: "hidden" }}>
      <h1 id="title" style={{
        color: 'white',
        // marginTop: '40px',
        // marginLeft: '10px',
        // marginBottom: '20px',
        }}>Experience</h1>
      {sessionUser && (
        <>
          <CreateImageModal />
        </>
      )}
      <div className="imageCard">
        {imagesList.map((image) => {
          return (
            <div key={image.id} style={{ alignContent: "center" }}>
              {/* <div key={image.id} className="image"> */}
              <Link
                to={`/images/${image.id}`}
                className="image"
                style={{ position: "relative" }}
              >
                <div className="overlay">
                  <h3 style={{ color: "white" }}>{image.title}</h3>
                </div>
                <img
                  src={image.imageUrl}
                  alt="coverImg"
                  className="image"
                  style={{ padding: 2.5 }}
                ></img>
              </Link>
              {/* <h3 id="imageContentTitle">{image.title}</h3>
              <p>{image.content}</p> */}
              {/* </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
