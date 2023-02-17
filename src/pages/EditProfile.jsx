import { FaAngleLeft, FaFileImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { updateUsers } from "../redux/apiCalls";
import { Notfound } from "./Notfound";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const id = currentUser._id;

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const user = { ...inputs, img: downloadURL };
            updateUsers(id, user, dispatch);
            navigate("/profile");
          });
        }
      );
    }
    const user = { ...inputs };
    updateUsers(id, user, dispatch);
    navigate("/profile");
  };
  return (
    <div>
      <Navbar />
      {currentUser._id ? (
        <>
          <Link to={"/profile"} className="ml-4 flex pt-20 items-center">
            <FaAngleLeft />
            Profile
          </Link>
          <div className="lg:flex max-w-full min-h-screen pb-28">
            <div className="flex-1 p-2 mr-5 rounded-lg shadow-lg flex items-center justify-center ">
              <div className="flex-colum">
                <div className="p-10 w-full flex items-center justify-center ">
                  <img
                    src={
                      currentUser.img
                        ? currentUser.img
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex-[2] p-5 rounded-lg shadow-lg">
              <div className="flex max-w-full justify-center">
                <label htmlFor="file" className=" btn btn-primary shadow-md ">
                  <FaFileImage /> Avatar
                </label>
                <input
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
              <div className="id mx-7 mt-7">
                <span>ID : {currentUser._id}</span>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="form-control m-7">
                    <label className="input-group">
                      <span className="w-28 ">Username</span>
                      <input
                        name="username"
                        onChange={handleChange}
                        type="text"
                        placeholder={currentUser.username}
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  <div className="form-control m-7">
                    <label className="input-group">
                      <span className="w-28 ">Email</span>
                      <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder={currentUser.email}
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  <div className="form-control m-7">
                    <label className="input-group">
                      <span className="w-28 ">Phone</span>
                      <input
                        onChange={handleChange}
                        name="phone"
                        type="number"
                        placeholder={currentUser.phone}
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="form-control my-7 mr-7">
                    <label className="input-group">
                      <span className="w-44  ">Current Password</span>
                      <input
                        onChange={handleChange}
                        name="currentPassword"
                        type="password"
                        placeholder="current password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  <div className="form-control my-7 mr-7">
                    <label className="input-group">
                      <span className="w-44 ">New password</span>
                      <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="new password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  <div className="form-control my-7 mr-7">
                    <label className="input-group">
                      <span className="w-44 ">Confirm password</span>
                      <input
                        onChange={handleChange}
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm new password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex  p-10 justify-center ">
                <button onClick={handleClick} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Notfound />
      )}
      <Footer />
    </div>
  );
};

export default EditProfile;
