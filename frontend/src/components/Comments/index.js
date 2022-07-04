import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { thunkGetComments, thunkDeleteComment } from '../../store/comments';
import LoginFormModal from '../LoginFormModal';
import CreateCommentModal from '../CommentFormModal';
import CommentForm from '../CommentFormModal/CommentForm';

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
    <>
      <h1>comments</h1>
      {!comments.length &&
        <>
          <h2> Doest seem to be any comments yet... why don't you start us off!</h2>
        </>
      }
      {sessionUser &&
        <CreateCommentModal />
      }
      {!sessionUser &&
      <text>
        Want to leave a comment?
        <LoginFormModal />
      </text>
      }
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>comment</th>
            </tr>
          {comments.map(comment => {
            return (
              <tr key={comment.id}>
                <td>{comment.User.username}</td>
                <td>{comment.comment}</td>
                { sessionUser?.id === comment.userId &&
                  (
                    <>
                      <td>
                        <button
                          onClick={() => dispatch(thunkDeleteComment(comment.id))}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </>
                  )
                }
              </tr>
              )
            })}
          </thead>
        </table>
    </>
  )
}
