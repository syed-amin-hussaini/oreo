// Import required libraries and components
import Head from "next/head";
import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Image from "next/image";

import Almost_1 from "@/public/assets/images/almost-there/screen-1.webp";
import Almost_2 from "@/public/assets/images/almost-there/screen-2.webp";


export default function Profile() {
  const [getStated, setGetStated] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState();

  const [submit, setSubmit] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (router.asPath === "/dashboard") {
      setGetStated(true)
      setTimeout(() => {
        setGetStated(false);
      }, 5000);
    }
  }, [])
  
  useEffect(() => {
    let cookies = parseCookies();
    if (cookies?.user) {
      cookies = JSON?.parse(cookies?.user);
      setUserData(cookies)
      setValue("name", cookies.name || "");
      setValue("email", cookies.email || "");
      setValue("age", cookies?.age || "");
      setValue("location", cookies?.location || "");
      setValue("phone", cookies?.phone || "");
      if (cookies.email) setEmailExit(true);
      setPhone(cookies?.phone || "");
    }
  }, [setValue]);

  const onSubmit = async (data) => {

    // return;
    setSubmit(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("location", data.location);
    formData.append("phone", phone);
    formData.append("email_status", userData?.email_status);

    try {
      const response = await axios.post("/api/form-detail", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setFormComplete(true)
        if (router.asPath === "/dashboard") {
          setTimeout(() => { 
            router.push("/dashboard");
          }, 5000);
        }
      }
    } catch (error) {
      const status = error?.response?.status;
      const statusText = error?.response?.statusText;
      console.log(status, statusText);
    }

    setSubmit(false);
  };

  return (
    <div>
      <Head>
        <title>Oreo | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
      {
        getStated && <Image src={Almost_1} fill alt="Almost There Banner" />
      }
      {
        formComplete && <Image src={Almost_2} fill alt="Profile Complete" />
      }
        <p className="text-white fw_r text-center">
          We just need a couple of details about you.Build your Oreo x Monopoly
          collection and win exciting gifts.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} row`}>
          <div className={`col-md-12`}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={99}
              {...register("name", {
                required: "Required",
                pattern: {
                  value: /^([a-zA-Z ]+)$/,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="name" as="p" />
          </div>

          <div className={`col-md-12`}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              className={styles.autoColor}
              maxLength={256}
              disabled={emailExit}
              {...register("email", {
                required: "Required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="email" as="p" />
          </div>
          <div className={`col-md-12`}>
            <label htmlFor="age">Age</label>
            <br />
            <input
              type="number"
              className={styles.autoColor}
              maxLength={99}
              {...register("age", {
                required: "Required",
                pattern: {
                  value: /^[0-9]{0,2}$/,
                  message: "Invalid",
                },
              })}
            />
            <ErrorMessage errors={errors} name="age" as="p" />
          </div>

          <div className={`col-md-12`}>
            <label htmlFor="location">Location</label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={30}
              {...register("location", {
                maxLength: 30 
              })}
            />
            <ErrorMessage errors={errors} name="location" as="p" />
          </div>
          <div className={`col-md-12`}>
            <label htmlFor="phone">Number</label>
            <br />
            <input
              type="number"
              className={styles.autoColor}
              maxLength={64}
              {...register("phone", {
                pattern: {
                  value: /^(\+92|0092|0)[1-9]\d{9}$/g,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="phone" as="p" />
          </div>
         
          <div className={`mt-3`}>
            <button
              type="submit"
              className={`${styles.submitBtn}`}
              disabled={submit}
            >
              {submit ? (
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              ) : (
                <span>Start Collecting</span>
              )}
            </button>
          </div>
        </form>
        <p className="text-white fw_r text-center">
          &copy; {new Date().getFullYear()} Oreo Pakistan Instance - All rights reserved
        </p>
      </main>
    </div>
  );
}
