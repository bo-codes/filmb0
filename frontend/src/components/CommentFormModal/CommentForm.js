import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkCreateComment } from "../../store/comments";



export default function CommentForm(props) {
  const { imageId } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("")
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if(!comment) errors.push("Please provide a comment")
    setValidationErrors(errors);
  },[comment])



const handleSubmit = (e) => {
  e.preventDefault();

  setSubmitted(true);

  if (validationErrors.length) return alert("Cannot Submit this Edit");

  const newComment = {
    userId: sessionUser.id,
    imageId: imageId,
    comment
  }

  dispatch(thunkCreateComment( imageId, newComment))

  setComment('');
  props.setTrigger(false)
}

  return (
    <>
      <section className="reviewForm" style={{marginBottom: '88px'}}>
        <h1>What are you thinking </h1>
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          {submitted && validationErrors.length > 0 && (
            <div>
              <ul>
                {validationErrors.map((error) => (
                  <ul key={error}>
                    <i className="fas fa-spinner fa-pulse"></i>
                    {error}
                  </ul>
                ))}
              </ul>
            </div>
          )}
          <label style={{color: 'white'}}>Comment: </label>
          <textarea
            placeholder="start typing here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" style={{marginRight: '8px'}}>Submit Comment</button>
          <button onClick={() => props.setTrigger(false)}>cancel</button>
        </form>
      </section>
    </>
  )
}
