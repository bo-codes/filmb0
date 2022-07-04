import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { thunkGetAllImages } from '../../store/images';
// import './home.css'

export default function Home() {
  const dispatch = useDispatch();

  const imagesList = useSelector(state => Object.values(state.images))
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllImages())
  }, [dispatch])


  return (
    <>
      <h1 className='homeTitle'>Welcome to filmB0</h1>
      <div className='homeCard'>
        {imagesList.map(image => {
          return (
              <div className="homeImageCard" key={image.id}>
                <Link to={`/images/${image.id}`} id='cardLink'>
                  <div key={image.id} className='homeContainer'>
                    <img src={image.imageUrl} alt="coverImg" id="imageHomeImg"></img>
                    <div id="imageDetails">
                      <h3 id="imageContent">{image.title}</h3>
                      <p id="imageLocation">{image.content}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>

    </>
  )
}
