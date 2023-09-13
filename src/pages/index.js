import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/src/styles/login.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Image from "next/image";
import Logo from "@/public/assets/images/complete-logo.png";
import Uncle from "@/public/assets/images/login/uncle.png";
import layer from "@/public/assets/images/layer.webp";
import Facebook from "@/public/assets/images/login/facebook.svg";
import Google from "@/public/assets/images/login/google.svg";

const Login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session, status } = useSession();
  const router = useRouter();
  let cookies = parseCookies();
 console.log(cookies?.user)
  useEffect(() => {
   
    if (cookies?.user != undefined) {
      router.replace("/dashboard");
    } 
  }, []);
  return (
    <div className={{}}>
      <Head>
        <title>Oreo | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div
        className={styles.main } style={{backgroundImage: `url(${layer.src})`}}>
        <Image alt="Logo" src={Logo} style={{width:"85%",objectFit: "contain",margin: "0 0 30px;",paddingBlock:"40px", display: "block"}} />
        <Image alt="Uncle" src={Uncle} style={{width:"85%",height:"auto",objectFit: "contain",marginBottom: "40px",display: "block"}} />
        
        <div
          style={{ maxWidth: "90%", width: "100%",marginBottom:"40px" }}
          className="text-center"
        >
          <a
            onClick={() => signIn("google")}
            className={`${styles.button} ${styles.button_google}`}
          >
            <Image alt="Google icon" src={Google} style={{padding:"10px"}} /> 
              Continue with Google
          </a>
          <a
            onClick={() => signIn("facebook")}
            className={`${styles.button} ${styles.button_facebook}`}
          >
            <Image alt="Facebook icon" src={Facebook} style={{padding:"10px"}} />
            Continue with Facebook
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
