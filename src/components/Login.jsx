import React from "react";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Login() {
  const navigate = useNavigate();
  const responseGoogle = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(credentialResponseDecoded));
    const { name, aud, picture } = credentialResponseDecoded;

    console.log(credentialResponseDecoded);
    const uuid = uuidv4();
    const doc = {
      _id: uuid,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log("login failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
