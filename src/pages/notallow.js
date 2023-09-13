import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

export default function NotAllow() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log({ session });

  return (
    <div className={{}}>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <h1>Not Allow</h1>
    </div>
  );
}
