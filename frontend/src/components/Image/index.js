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
      <div className="background">
        <div
          className="imageDetails"
          style={{
            maxWidth: "88vw",
            maxHeight: "88vh",
            // display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: "3px",
            // marginBottom: "80px",
            // background: 'pink'
          }}
        >
          <div
            style={{
              boxShadow: "10px 10px 8px 10px white",
              marginBottom: "20px",
              // background: 'grey',
            }}
          >
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
                paddingTop: "30px",
                // boxShadow: "10px 10px 100px 100px white",
              }}
            ></img>
            <div
              style={{
                color: "white",
                marginTop: "30px",
                marginLeft: "30px",
                marginRight: "30px",
                marginBottom: "60px",
                paddingBottom: "30px",
                paddingTop: "10px",
                textAlign: "center",
                //  background: 'purple'
              }}
            >
              <h1>{image.title}</h1>
              {/* <p>{image.User.username}</p> */}
              <p style={{ paddingTop: "4px" }}>{image.content}</p>
            </div>
          </div>
        </div>
        <Comments />
      </div>
      // <div className='background'>
      //   <div className='imageDetails'>
      //     <img src={image.imageUrl} id='imageDetailImg'></img>
      //     <h1>{image.title}</h1>
      //     <p>{image.content}</p>

      //   </div>
      //   <Comments />
      // </div>
    );
  }

  return (
    <div className="background">
      <div
        className="imageDetails"
        style={{
          maxWidth: "88vw",
          maxHeight: "88vh",
          // display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: '3px',
          // marginBottom: "80px",
          // background: 'pink'
        }}
      >
        <div style={{
          boxShadow: "10px 10px 8px 10px white",
          marginBottom: '20px',
          // background: 'grey',
          }}>
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
              paddingTop: '30px'
              // boxShadow: "10px 10px 100px 100px white",
            }}
          ></img>
          <div style={{
            color: "white",
            marginTop: '30px',
             marginLeft: '30px',
             marginRight: '30px',
             marginBottom: '60px',
             paddingBottom: '30px',
             paddingTop: '10px',
             textAlign: 'center',
            //  background: 'purple'
             }}>
            <h1>{image.title}</h1>
            {/* <p>{image.User.username}</p> */}
            <p style={{paddingTop: '4px'}}>{image.content}</p>
          </div>
        </div>
        <div style={{
          padding: '9px',
          // background: 'green'
          }}>
          {sessionUser.id === image.userId && (
            <div style={{
              padding: '6px',
              // background: 'red'
              }}>
              <EditFormModal />
              <button onClick={onDelete}>
                delete
              </button>
              {/* <button onClick={onDelete}>
                <i className="fa-solid fa-trash"></i>
              </button> */}
            </div>
          )}
        </div>
      </div>
      <Comments />
    </div>
  );
}



// //OLD
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams, useHistory, NavLink, Link } from 'react-router-dom'
// import { thunkGetImage, thunkDeleteImage } from '../../store/images';
// import EditFormModal from '../EditImageModal';
// import EditForm from '../EditImageModal/EditForm';
// import Comments from '../Comments';

// import '.'
// // import './image.css'


// export default function ImageId() {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const { imageId } = useParams();


//   const image = useSelector(state=> state.images[imageId]);

//   const sessionUser = useSelector(state => state.session.user);

//   useEffect(() => {
//     dispatch(thunkGetImage(imageId))
//   },[dispatch])

//   const onDelete = async() => {
//     await dispatch(thunkDeleteImage(imageId))
//     history.push('/images')
//   }

//   if(!image){
//     return null
//   }

//   if(!sessionUser) {
//     return (
//       <div className='background'>
//         <div className='imageDetails'>
//           <img src={image.imageUrl} id='imageDetailImg'></img>
//           <h1>{image.title}</h1>
//           <p>{image.content}</p>

//         </div>
//         <Comments />
//       </div>
//       )
//   }

//   return (
//     <>
//       <div className='imageDetails'>
//         <>
//           <img src={image.imageUrl} id='imageDetailImg'></img>
//           <h1>{image.title}</h1>
//           <p>{image.content}</p>
//         </>
//         {sessionUser.id === image.userId &&
//           (
//             <>
//               <EditFormModal />
//               <button
//               onClick={onDelete}>
//                 <i className="fa-solid fa-trash"></i>
//               </button>
//             </>
//           )
//         }
//       </div>
//       <Comments />
//     </>
//   )
// }
