import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkUpdateImage } from "../../store/images";

export default function EditForm(props) {
  const { imageId } = useParams();
  const dispatch = useDispatch();

  const image = useSelector((state) => state.images[imageId]);
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (
      !imageUrl.endsWith(".jpg") &&
      !imageUrl.endsWith(".jpeg") &&
      !imageUrl.endsWith(".png") &&
      !imageUrl.endsWith(".gif")
    ) {
      errors.push(
        "Please provide an image file with extensions: .jpg, .jpeg, .png, or .gif"
      );
    }
    if (!title) errors.push("Please provide a title for your post");

    setValidationErrors(errors);
  }, [imageUrl, title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    console.log(validationErrors);
    if (validationErrors.length) return alert(
      `${validationErrors}`
    );

    const newImage = {
      ...image,
      userId: sessionUser.id,
      title,
      imageUrl,
      content,
    };

    const updatedImage = await dispatch(thunkUpdateImage(newImage));

    if (updatedImage) {
      reset();
    }
  };
  const reset = () => {
    setTitle("");
    setImageUrl("");
    setContent("");
    setSubmitted(false);
    props.setTrigger(false);
  };

  return (
    <div className="login-form" style={{marginBottom: '88px'}}>
      <form onSubmit={handleSubmit}>
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
          <div>
            <label style={{ color: "white" }}>Title</label>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label style={{ color: "white" }}>Image Url</label>
          </div>
          <input
            type="text"
            placeholder="Img url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label style={{ color: "white" }}>Content</label>
          </div>
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
