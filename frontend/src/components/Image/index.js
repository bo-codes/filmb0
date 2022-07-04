import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink, Link } from 'react-router-dom'
import { thunkGetImage, thunkDeleteImage } from '../../store/images';
import EditFormModal from '../EditImageModal';
import EditForm from '../EditImageModal/EditForm';
import Comments from '../Comments';

// import "/Users/eli/Desktop/filmb0--/frontend/src/index.css";
// import './image.css'


export default function ImageId() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { imageId } = useParams();


  const image = useSelector(state=> state.images[imageId]);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetImage(imageId))
  },[dispatch])

  const onDelete = async() => {
    await dispatch(thunkDeleteImage(imageId))
    history.push('/images')
  }

  if(!image){
    return null
  }

  if(!sessionUser) {
    return (
      <div className='background'>
        <div className='imageDetails'>
          <img src={image.imageUrl} id='imageDetailImg'></img>
          <h1>{image.title}</h1>
          <p>{image.content}</p>

        </div>
        <Comments />
      </div>
      )
  }

  return (
    <div className="background">
      <div
        className="imageDetails"
        style={{
          maxWidth: "88vw",
          maxHeight: "88vh",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <>
          <img
            src={image.imageUrl}
            id="imageDetailImg"
            style={{
              maxWidth: "88vw",
              maxHeight: "88vh",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
          ></img>
          <h1>{image.title}</h1>
          <p>{image.content}</p>
        </>
        {sessionUser.id === image.userId && (
          <>
            <EditFormModal />
            <button onClick={onDelete}>
              <i></i>
            </button>
          </>
        )}
      </div>
      <Comments />
    </div>
  );
}
