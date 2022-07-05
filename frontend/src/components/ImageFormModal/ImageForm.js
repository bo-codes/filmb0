import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateImage } from "../../store/images";

import '../../index.css'

export default function ImageForm(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (
      !imageUrl.endsWith(".jpg") &&
      !imageUrl.endsWith(".jpeg") &&
      !imageUrl.endsWith(".png") &&
      !imageUrl.endsWith(".gif")
    ) {
      if(errors) errors.push("Image file must be a .jpg, .jpeg, .png, or .gif, ");
      else errors.push("Image file must be a .jpg, .jpeg, .png, or .gif");
    }

    if (!title) {
      if(errors)  errors.push("Please provide a title for your post, ");
      else errors.push('Please provide a title for your post')
    }
    setValidationErrors(errors);
  }, [imageUrl, title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (validationErrors.length) return alert(validationErrors);


    const newPhoto = {
      userId: sessionUser.id,
      title,
      imageUrl,
      content,
    };

    if (newPhoto) {
      dispatch(thunkCreateImage(newPhoto));
    }

    setTitle("");
    setImageUrl("");
    setContent("");
    setSubmitted(false);
    setValidationErrors([]);
    props.setTrigger(false);
  };

  return (
    <div className="login-form" style={{marginBottom: '88px'}}>
      <form onSubmit={handleSubmit} >
        {submitted && validationErrors.length > 0 && (
          <div>
            <ul>
              {validationErrors.map((err) => {
                <li key={err}>{err}</li>;
              })}
            </ul>
          </div>
        )}
        <div>
          <label style={{ color: "white" }}>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label style={{ color: "white" }}>Image Url</label>
          <input
            type="text"
            placeholder="Img url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label style={{ color: "white" }}>Content</label>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Post Photo</button>
        <button onClick={() => props.setTrigger(false)}>cancel</button>
      </form>
    </div>
  );
}
