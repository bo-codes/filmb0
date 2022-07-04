import { csrfFetch } from './csrf'

//SWITCH CASES

//GET COMMENTS
const getAllComments = 'comments/getComments'

//CREATE COMMENT
const createComment = 'comments/createComments'

//DELETE COMMENT
const removeComment = 'comments/removeComment'

//ACTION CREATORS
const actionGetComments = (comments) => {
  return {
     type: getAllComments,
     comments
   }
 }

const actionCreateComment = (comment) => {
  return {
     type: createComment,
     comment
   }
 }

const actionDeleteComment = (commentId) => {
  return {
     type: removeComment,
     commentId
   }
 }

//THUNKS
export const thunkGetComments = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}/comments`);
  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetComments(data));
    return response;
  }
  return await response.json()
};

export const thunkCreateComment = ( imageId, comment) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}/comments`, {
    method: "POST",
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(comment),
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateComment(data));
    return data;
  }
};

export const thunkDeleteComment = (commentId) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if(response.ok) {
    const deletedImage = await response.json();
    dispatch(actionDeleteComment(commentId));
    return deletedImage;
  }
};



//REDUCER
const comments = (state = {}, action) => {

  let newState = {...state}

  switch(action.type){
    case getAllComments:
      newState = {}
      action.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      return newState

    case createComment:
      newState[action.comment.id] = action.comment
      return newState

    case removeComment:
      delete newState[action.commentId]
      return newState
    default:
      return state;
  }
}

export default comments;
