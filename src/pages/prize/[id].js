import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";
import Webcam from "react-webcam";

import styles from "@/src/styles/Camera.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

export default function Price() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  const { id } = router.query
  const [torchEnabled, setTorchEnabled] = useState(false);

  const toggleTorch = () => {
    setTorchEnabled(!torchEnabled);
  };

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "environment",
    torch: torchEnabled,
  };

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    let data_i = JSON.stringify({
      img: imageSrc
    });
    // Send the captured image to a third-party API
    try {
      const response = await axios({
        method: "post",
        url: "https://obackend.hul-hub.com/api/scan-cookie",
        data: data_i,
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        console.log({response})
        // Handle success
      } else {
        console.log("Else")
        // Handle error
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Drawer />
      <main className={`${styles.main} container-fluid`}>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={false}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg" 
          screenshotQuality={1}
          />
        <button onClick={capture}>Capture photo {id}</button>
        <button style={{marginBottom:"40px"}} onClick={toggleTorch}>
          {torchEnabled ? 'Turn Off Torch' : 'Turn On Torch'}
        </button>
        {imgSrc && <img style={{position: "absolute",left: "20%",top: "-20px"}} src={imgSrc} />}

      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
