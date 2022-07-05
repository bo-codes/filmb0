import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { thunkGetComments, thunkDeleteComment } from '../../store/comments';
import LoginFormModal from '../LoginFormModal';
import CreateCommentModal from '../CommentFormModal';
import CommentForm from '../CommentFormModal/CommentForm';
import './comments.css'

export default function Comments() {
  const dispatch = useDispatch();
  const { imageId } = useParams();

  const comments = useSelector(state => Object.values(state.comments))
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(thunkGetComments(imageId))
  },[dispatch, imageId])


  if(!comments){
    return null
  }

  return (
    <div style={{
      color: "white",
      marginLeft: '6%',
      marginTop: "160px",
      paddingTop: '110px',
      paddingBottom: '88px'
      // background: 'blue'
      }}>
      <h1>thoughts</h1>
      {!comments.length && (
        <>
          <h2>
            {" "}
            Doest seem to be any comments yet... why don't you start us off!
          </h2>
        </>
      )}
      {!sessionUser && (
        <text>
          Want to leave a comment?
          <LoginFormModal />
        </text>
      )}
      <table style={{paddingLeft: '10px'}}>
        <thead>
          {/* <tr>
            <th>Name</th>
            <th>thought</th>
          </tr> */}
          {comments.map((comment) => {
            return (
              <tr key={comment.id}>
                <td style={{fontWeight: '500px', background: 'grey'}}>{comment.User.username}</td>
                <td style={{background: '#373737'}}>{comment.comment}</td>
                {sessionUser?.id === comment.userId && (
                  <>
                    <td>
                      <button
                        onClick={() => dispatch(thunkDeleteComment(comment.id))}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </thead>
      </table>
      {sessionUser && <CreateCommentModal />}
    </div>
  );
}
