import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
import CreateImageModal from '../ImageFormModal';
import ImageForm from '../ImageFormModal/ImageForm';

// import './images.css'


export default function Images() {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunkGetAllImages())
  }, [dispatch])



  const imagesList = useSelector(state => Object.values(state.images))
  const sessionUser = useSelector(state => state.session.user);


  return (
    <>
      <h1 id="title">Experience</h1>
      {sessionUser &&
      <>
        <CreateImageModal />
      </>
      }
      <div className='imageCard'>
        {imagesList.map(image => {
          return (
            <div key={image.id} className='imageContainer'>
              <Link to={`/images/${image.id}`} id="imageLink">
                <img src={image.imageUrl} alt="coverImg" id="imageImg"></img>
                <h3 id="imageContentTitle">{image.title}</h3>
              </Link>
              <p>{image.content}</p>
            </div>
            )
          })
        }
      </div>
    </>
  )
}
