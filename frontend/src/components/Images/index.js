import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
import CreateImageModal from '../ImageFormModal';
import ImageForm from '../ImageFormModal/ImageForm';

import './images.css'


export default function Images() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(thunkGetAllImages());
  }, [dispatch]);



  const imagesList = useSelector((state) => Object.values(state.images));
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className='background' style={{overflow: 'hidden'}}>
      <h1 id="title" style={{
        color: 'white',
        marginTop: '40px',
        marginLeft: '10px',
        marginBottom: '20px',
        fontSize: '10vw'
        }}>Experiences</h1>\
      <div className="imageCard">
        {imagesList.map((image) => {
          return (
            <div key={image.id} style={{alignContent: 'center'}}>
              {/* <div key={image.id} className="image"> */}
              <Link to={`/images/${image.id}`} className="image" style={{position: 'relative'}}>
                <div className='overlay'>
                  <h3 style={{color: 'white'}}>{image.title}</h3>
                </div>
                <img
                  src={image.imageUrl}
                  alt="coverImg"
                  className="image"
                  style={{ padding: 2.5 }}
                  >
                </img>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        {sessionUser && (
          <div>
            <CreateImageModal />
          </div>
        )}
      </div>
    </div>
  );

}
