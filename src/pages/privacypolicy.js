import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import Nav from "@/components/Nav";

export default function PrivacyPolicy() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log({ session });

  return (
    <div className={{}}>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={{}}>
        <h1 className={{}}>Privacy Policy </h1>
        
      </main>
    </div>
  );
}

  