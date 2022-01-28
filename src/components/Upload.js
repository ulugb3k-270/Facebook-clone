import "./css/Upload.css";
import { useRef, useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import {
  Close,
  CloudUpload as UploadIcon,
  Delete,
} from "@material-ui/icons";
import { db, storage } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function Upload() {
  const [{ user }, dispatch] = useStateValue();
  const [uploadBool, setUploadBool] = useState(false);
  const [uploadFileBool, setUploadFileBool] = useState(true);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(null);

  //  input files
  const [selectedFile, setSelectedFile] = useState("");
  const [input, setInput] = useState("");
  // input files end

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  //   upload
  const uploadPost = async (e) => {
    if (input || selectedFile) {
      e.preventDefault();
      setLoading(true);

      const docRef = await addDoc(collection(db, "posts"), {
        userName: user?.displayName,
        postText: input,
        userImg: user?.photoURL,
        timestamp: serverTimestamp(),
      });

      if(selectedFile){
        const imageRef = ref(storage, `message/${docRef.id}/image`);

      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            postImg: downloadURL,
          });
        }
      );
      }

      setSelectedFile(null);
      setUploadBool(false);
      setLoading(false);
      setInput("");
    }
  };

  // -------------------
  



  // -------------------


  return (
    <div className="upload rounded-lg">
      <div className=" bg-white p-4 pb-0 rounded-lg">
        <div className="upload__top flex items-center gap-2">
          <img
            src={
              user?.photoURL ||
              `https://scontent.ftas1-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/34535825_609891072728674_8429423774293557248_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=J_-y8y3pGNMAX_IAgWo&_nc_ht=scontent.ftas1-1.fna&oh=00_AT_uSS3M_AmiObtSeMSdJlXpJlHHHWW2XJoNDN2CB0qmfQ&oe=61F05CBF`
            }
            alt={user?.displayName}
            className="rounded-full cursor-pointer w-[40px] h-[40px] object-cover"
          />
          <div
            className="relative w-full cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-xl"
            onClick={() => {
              setUploadBool(true);
              setUploadFileBool(false);
            }}
          >
            <p className="top-1 left-2 text-lg upload__insideInput">
              What's in your mind, {user?.displayName || "UllU"}?
            </p>
          </div>
        </div>
        <hr className="text-gray-200 mt-3" />
        <div className="flex justify-evenly p-2">
          {/* Video SVG */}
          <div className="flex gap-1 rounded-xl w-full justify-center  items-center p-3 cursor-pointer hover:bg-gray-200">
            <svg
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="fill-red-600 w-[24px] h-[24px]"
            >
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path
                    d="M113.029 2.514c-.363-.088-.746.014-1.048.234l-2.57 1.88a.999.999 0 0 0-.411.807v8.13a1 1 0 0 0 .41.808l2.602 1.901c.219.16.477.242.737.242.253 0 .508-.077.732-.235.34-.239.519-.65.519-1.065V3.735a1.25 1.25 0 0 0-.971-1.22m-20.15 6.563c.1-.146 2.475-3.578 5.87-3.578 3.396 0 5.771 3.432 5.87 3.578a.749.749 0 0 1 0 .844c-.099.146-2.474 3.578-5.87 3.578-3.395 0-5.77-3.432-5.87-3.578a.749.749 0 0 1 0-.844zM103.75 19a3.754 3.754 0 0 0 3.75-3.75V3.75A3.754 3.754 0 0 0 103.75 0h-10A3.754 3.754 0 0 0 90 3.75v11.5A3.754 3.754 0 0 0 93.75 19h10z"
                    transform="translate(354 158.5)"
                  ></path>
                  <path
                    d="M98.75 12c1.379 0 2.5-1.121 2.5-2.5S100.129 7 98.75 7a2.503 2.503 0 0 0-2.5 2.5c0 1.379 1.121 2.5 2.5 2.5"
                    transform="translate(354 158.5)"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="uploadTxt">Live Video</span>
          </div>
          {/* Photo SVG */}
          <div
            onClick={() => {
              setUploadBool(true);
              setUploadFileBool(true);
            }}
            className="flex gap-1 rounded-xl w-full justify-center  items-center p-3 cursor-pointer hover:bg-gray-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="fill-green-400 w-[24px] h-[24px]"
            >
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path
                    d="m96.968 22.425-.648.057a2.692 2.692 0 0 1-1.978-.625 2.69 2.69 0 0 1-.96-1.84L92.01 4.32a2.702 2.702 0 0 1 .79-2.156c.47-.472 1.111-.731 1.774-.79l2.58-.225a.498.498 0 0 1 .507.675 4.189 4.189 0 0 0-.251 1.11L96.017 18.85a4.206 4.206 0 0 0 .977 3.091s.459.364-.026.485m8.524-16.327a1.75 1.75 0 1 1-3.485.305 1.75 1.75 0 0 1 3.485-.305m5.85 3.011a.797.797 0 0 0-1.129-.093l-3.733 3.195a.545.545 0 0 0-.062.765l.837.993a.75.75 0 1 1-1.147.966l-2.502-2.981a.797.797 0 0 0-1.096-.12L99 14.5l-.5 4.25c-.06.674.326 2.19 1 2.25l11.916 1.166c.325.026 1-.039 1.25-.25.252-.21.89-.842.917-1.166l.833-8.084-3.073-3.557z"
                    transform="translate(352 156.5)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="m111.61 22.963-11.604-1.015a2.77 2.77 0 0 1-2.512-2.995L98.88 3.09A2.77 2.77 0 0 1 101.876.58l11.603 1.015a2.77 2.77 0 0 1 2.513 2.994l-1.388 15.862a2.77 2.77 0 0 1-2.994 2.513zm.13-1.494.082.004a1.27 1.27 0 0 0 1.287-1.154l1.388-15.862a1.27 1.27 0 0 0-1.148-1.37l-11.604-1.014a1.27 1.27 0 0 0-1.37 1.15l-1.387 15.86a1.27 1.27 0 0 0 1.149 1.37l11.603 1.016z"
                    transform="translate(352 156.5)"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="uploadTxt">Photo</span>
          </div>
          {/* Feeling SVG */}
          <div className="flex gap-1 rounded-xl w-full justify-center  items-center p-3 cursor-pointer hover:bg-gray-200">
            <svg
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="fill-orange-400 w-[24px] h-[24px]"
            >
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path
                    d="M107.285 13c.49 0 .841.476.712.957-.623 2.324-2.837 4.043-5.473 4.043-2.636 0-4.85-1.719-5.473-4.043-.13-.48.222-.957.712-.957h9.522z"
                    transform="translate(353.5 156.5)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="M114.024 11.5c0 6.351-5.149 11.5-11.5 11.5s-11.5-5.149-11.5-11.5S96.173 0 102.524 0s11.5 5.149 11.5 11.5zm-2 0a9.5 9.5 0 1 0-19 0 9.5 9.5 0 0 0 19 0z"
                    transform="translate(353.5 156.5)"
                  ></path>
                  <path
                    d="M99.524 8.5c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m8.5 0c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m-.739 4.5h-9.522c-.49 0-.841.476-.712.957.623 2.324 2.837 4.043 5.473 4.043 2.636 0 4.85-1.719 5.473-4.043.13-.48-.222-.957-.712-.957m-2.165 2c-.667.624-1.592 1-2.596 1a3.799 3.799 0 0 1-2.596-1h5.192"
                    transform="translate(353.5 156.5)"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="uploadTxt"> Feeling/Activity </span>
          </div>
        </div>
      </div>
      {uploadBool && (
        <div className={` fixed w-full h-full popUp__upload top-0 left-0 grid place-items-center z-50 ${loading ? "cursor-wait" : ""}`}>
          <form
            className={`bg-white upload__box rounded-xl p-4  popUp__upload-box  ${
              uploadFileBool ? " h-[460px]" : "h-[250px]"
            }`}
          >
            <div className="flex gap-4 relative">
              <p className="flex-1 text-center text-[20px] py-1 font-bold">
                Create Post
              </p>
              <Close
                className="absolute top-0 right-2 bg-gray-100 rounded-full !w-[36px]  !h-[36px] p-1 hover:bg-gray-200"
                onClick={() => setUploadBool(false)}
              />
            </div>
            <hr className="text-gray-200 mt-3" />
            <div className="w-full p-3">
              <div className="user__info flex items-center gap-2">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] cursor-pointer"
                />
                <p>{user?.displayName || "Guest"}</p>
              </div>
              <input
                type="text"
                placeholder={`What is in your mind, ${user?.displayName}?`}
                className="w-full focus:outline-none p-2 mt-3  border rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {uploadFileBool && (
              <div className="upload p-2 border border-gray-300 rounded-lg relative">
                {!selectedFile ? (
                  <>
                    <div
                      className="bg-gray-100 hover:bg-gray-200 w-full h-[200px] cursor-pointer flex flex-col items-center justify-center"
                      onClick={() => filePickerRef.current.click()}
                    >
                      <UploadIcon />
                      <p>Upload Photo</p>
                    </div>
                    <Close
                      className="absolute top-3 right-3 bg-white rounded-full !w-27px]  !h-27px] p-1 hover:bg-gray-200"
                      onClick={() => setUploadFileBool(false)}
                    />
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                      className="popUp__file-input"
                      accept="image/gif, image/png, image/jpeg"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={selectedFile}
                      className="h-[200px] selectedFile"
                      alt=""
                    />

                    <Delete
                      className="absolute top-3 right-3 bg-white rounded-full !w-27px]  !h-27px] p-1 hover:bg-gray-200"
                      onClick={() => setSelectedFile("")}
                    />
                  </>
                )}
              </div>
            )}
            {/* ERROR */}
            <button
              className={`${
                !loading
                  ? "bg-blue-600"
                  : "bg-blue-300"
              } w-full rounded-lg text-white hover:bg-blue-600 p-1 mt-3 `}
              onClick={uploadPost}
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
