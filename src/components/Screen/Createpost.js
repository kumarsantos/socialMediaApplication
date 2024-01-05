import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const Createpost = () => {
  const history = useHistory();

  const [title, settitle] = useState("");
  const [postcontent, setpostcontent] = useState("");
  const [image, setimage] = useState("");
  const [URL, SetUrl] = useState("");

  useEffect(() => {
    if (URL) {
      const post = { title, postcontent, pic: URL };
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Post is created Successfully",
              classes: "#c62828 green darken-3",
            });
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [URL]);

  const PostDetails = (e) => {
    const data = new FormData(); //these steps are used to store the file or picture in cloudinary cloud
    //and giving link from these cloud to mongodb to store the image
    data.append("file", image);
    data.append("upload_preset", "insta-clone"); //insta-clone is name of unsigned preset in cloudinary.com
    data.append("cloud_name", "santoshkumarsah"); //cloud name is santoshkumarsah and  unsigned insta-clone //cloud password is Ssah_5803@
    fetch("https://api.cloudinary.com/v1_1/santoshkumarsah/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        SetUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        className="card input-filed"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Create Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content of post"
          value={postcontent}
          onChange={(e) => setpostcontent(e.target.value)}
        />

        <div className="file-field input-field">
          <div className="btn blue darken-1 ">
            <span>Upload Image</span>
            <input
              type="file"
              multiple
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one or more files"
            />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #2196f3 blue darken-1"
          onClick={(e) => PostDetails(e)}
        >
          Submit Post
        </button>
        {/* <h5><NavLink to='/'>
                <button className="btn waves-effect waves-light #2196f3 red darken-2">
                   Back                    
                </button>
                    
                    </NavLink></h5> */}
      </div>
    </div>
  );
};

export default Createpost;
