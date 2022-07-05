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
    // <div className="background" style={{ overflow: "hidden" }}>
    //   <div id="title" style={{
    //     color: 'white',
    //     marginTop: '40px',
    //     marginRight: '20px',
    //     marginBottom: '20px',
    //     fontSize: '2.5vw',
    //     fontWeight: 'bold',
    //     textAlign: "right"

    //     }}>What Do Your Thoughts Look Like ¿</div>
    //   {sessionUser && (
    //     <>
    //       <CreateImageModal />
    //     </>
    //   )}
    //   <div className="imageCard">
    //     {imagesList.map((image) => {
    //       return (
    //         <div key={image.id} style={{ alignContent: "center" }}>
    //           {/* <div key={image.id} className="image"> */}
    //           <Link
    //             to={`/images/${image.id}`}
    //             className="image"
    //             style={{ position: "relative" }}
    //           >
    //             <div className="overlay">
    //               <h3 style={{ color: "white" }}>{image.title}</h3>
    //             </div>
    //             <img
    //               src={image.imageUrl}
    //               alt="coverImg"
    //               className="image"
    //               style={{ padding: 2.5 }}
    //             ></img>
    //           </Link>
    //           {/* <h3 id="imageContentTitle">{image.title}</h3>
    //           <p>{image.content}</p> */}
    //           {/* </div> */}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
