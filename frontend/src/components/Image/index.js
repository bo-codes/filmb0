import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink, Link } from 'react-router-dom'
import { thunkGetImage, thunkDeleteImage } from '../../store/images';
import EditFormModal from '../EditImageModal';
import EditForm from '../EditImageModal/EditForm';
import Comments from '../Comments';
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
      <>
        <div className='imageDetails'>
          <img src={image.imageUrl} id='imageDetailImg'></img>
          <h1>{image.title}</h1>
          <p>{image.content}</p>

        </div>
        <Comments />
      </>
      )
  }

  return (
    <>
      <div className='imageDetails'>
        <>
          <img src={image.imageUrl} id='imageDetailImg'></img>
          <h1>{image.title}</h1>
          <p>{image.content}</p>
        </>
        {sessionUser.id === image.userId &&
          (
            <>
              <EditFormModal />
              <button
              onClick={onDelete}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </>
          )
        }
      </div>
      <Comments />
    </>
  )
}
