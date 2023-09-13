import { SessionProvider, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import "@/src/styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import LoaderImage from "@/public/assets/images/loader.gif";
import Layer from "@/public/assets/images/layer-2.webp";
import { useEffect, useState } from "react";


function MyApp({ Component, pageProps, session }) {
  const [loader, setLoader] = useState(true)
  useEffect(() => {
  setTimeout(() => {
    setLoader(false)
  }, 3000);
  }, [])
  return (
    // <SessionProvider session={pageProps.session}>
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
      <div className="loader" style={{backgroundColor:"#fff",backgroundImage: `url(${Layer.src})`, display: `${loader ? 'grid' :'none'}` }}>
        <span className="text-center">
        <Image
          src={LoaderImage}
          alt="App Loader"
          width={250} // Set the width of the image
          height={250} // Set the height of the image
        />
        <p className="text-white">Loading.</p>

        </span>
      </div>
      <Component {...pageProps} />
      
      <ToastContainer
        // toastStyle={{background:"#000",color:"#fff"}}
        // progressStyle={{background:"#7F8FBB"}}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
}

// export async function getServerSideProps(context) {
//   // Use the fetchCookieMiddleware to fetch the cookie value
//   const { myCookieValue } = await fetchCookieMiddleware(context);
//   console.log(myCookieValue)
//   return {
//     props: {
//       myCookieValue,
//     },
//   };
// }

export default MyApp;
