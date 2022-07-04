import { csrfFetch } from "./csrf"

//SWITCH CASES

//GET IMAGE
const getOne = "images/getImage"

//GET IMAGES
const getAll = "images/getImages"

//CREATE
const create = "images/createImage"

//UPDATE image
const update = "images/updateImage"

//DELETE image
const remove = "images/deleteImage"


//ACTION CREATORS
const actionGetImage = (image) => {
  return {
    type: getOne,
    image,
  };
};

const actionGetImages = (images) => {
 return {
    type: getAll,
    images
  }
}

const actionCreateImages = (image) => {
 return {
    type: create,
    image
  }
}

const actionUpdateImage = (image) => {
  return {
    type: update,
    image,
  };
};

const actionDeleteImage = (imageId) => {
  return {
    type: remove,
    imageId,
  };
};


//THUNKS
export const thunkGetImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetImage(data));
    return response
  }
};

export const thunkGetAllImages = () => async dispatch => {
  const response = await csrfFetch('/api/images');
  if(response.ok) {
    const data = await response.json();
    dispatch(actionGetImages(data));
    return response;
  }
  return await response.json()
};

export const thunkCreateImage = (image) => async dispatch => {
  const response = await csrfFetch('/api/images', {
    method: "POST",
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(image),
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(actionCreateImages(data));
    return response;
  }
};

export const thunkUpdateImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: "PUT",
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(image),
  });
  if(response.ok) {
    const data = await response.json();
    dispatch(actionUpdateImage(data));
    return data;
  }
};

export const thunkDeleteImage = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  if(response.ok) {
    const deletedImage = await response.json();
    dispatch(actionDeleteImage(imageId));
    return deletedImage;
  }
};



//REDUCER
const images = (state = {}, action) => {

  let newState = {...state}

  switch (action.type) {

    case getOne:
      newState = {}
      newState = {[action.image.id]: action.image};
      return newState;

    case getAll:
      action.images.forEach(image => {
        newState[image.id] = image;
      })
        return newState

    case create:
      newState[action.image.id] = action.image
      return newState

    case update:
      newState[action.image.id] = action.image
      return newState

    case remove:
      newState = {...state}
      delete newState[action.imageId]
      return newState;

    default:
      return state;
  };
};


export default images;
