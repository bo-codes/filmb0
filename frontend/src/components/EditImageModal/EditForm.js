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
      !imageUrl.endsWith(".png") &&
      !imageUrl.endsWith(".gif")
    ) {
      errors.push(
        "Please provide an image file with extensions: .jpg, .png, or .gif"
      );
    }
    if (
      !imageUrl.endsWith(".jpg") &&
      !imageUrl.endsWith(".png") &&
      !imageUrl.endsWith(".gif")
    ) {
      errors.push("Image file must be a .jpg, .png, or .gif");
    }
    // if(!title) {
    //   errors.push('Please provide a title')
    // }
    // if(title.length > 100) {
    //   errors.push('Title must be less than 100 characters')
    // }
    setValidationErrors(errors);
  }, [imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    console.log(validationErrors);
    if (validationErrors.length) return alert("Please complete form before submitting");

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
    <div>
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
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Img url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post Photo</button>
      </form>
    </div>
  );
  // return (
  //   <>
  //     <section className="beachForm">
  //       <h1>Editing {beach.title}</h1>
  //       <form className="createnewImage" onSubmit={handleSubmit}>
  //         {hasSubmitted && validationErrors.length > 0 && (
  //           <div>
  //             Wow there! Fix these up before you go 😉:
  //             <ul>
  //               {validationErrors.map((error) => (
  //                 <ul key={error}>
  //                   <i className="fas fa-spinner fa-pulse"></i>
  //                 {error}
  //                 </ul>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //         <input
  //           type="text"
  //           placeholder="Beach Image URL"
  //           value={coverImg}
  //           onChange={(e) => setCoverImg(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Title"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //         <textarea
  //           placeholder="Description of beach 🌊"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Address"
  //           value={address}
  //           onChange={(e) => setAddress(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="City"
  //           value={city}
  //           onChange={(e) => setCity(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Country"
  //           value={country}
  //           onChange={(e) => setCountry(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="ZipCode"
  //           value={zipCode}
  //           onChange={(e) => setZipCode(e.target.value)}
  //         />
  //         <button type="submit">Finish Editing</button>
  //       </form>
  //     </section>
  //   </>
  // );
}
